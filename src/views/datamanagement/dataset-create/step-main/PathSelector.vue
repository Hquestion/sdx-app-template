<template>
    <div class="path-selector">
        <div class="select-btn">
            <el-button
                type="primary"
                size="small"
                @click="selectFile"
            >
                {{ btnText }}
            </el-button>
            <slot />
        </div>
        <div
            class="path-indicator"
            v-if="path"
        >
            <i :class="['iconfont', fileIcon]" />
            <span>{{ selectedPath }}</span>
        </div>
        <sdxu-dialog
            class="path-selector-dialog"
            :close-on-click-modal="false"
            :visible.sync="visible"
        >
            <div
                slot="title"
                class="selector-dialog-title"
            >
                {{ `请选择目标${type === 'file' ? '文件' : '目录'}` }}
            </div>
            <el-table
                :data="_targetFolders"
                v-loading="showLoading"
                @row-click="onSelectRow"
                :row-class-name="rowClassNameFn"
                class="path-select-table"
            >
                <el-table-column
                    min-width="100px"
                    label="文件名"
                >
                    <template slot-scope="scope">
                        <div
                            class="selector-file-icon"
                            :class="{'dir-icon-class':scope.row.is_dir,
                                     'user-file-icon': !scope.row.is_dir && scope.row.type !== 0}"
                        />
                        <a
                            class="dir-class"
                            @click.prevent.stop="toFolders(scope.row)"
                            v-if="scope.row.is_dir || scope.row.type === 0"
                        >
                            {{ scope.row.name }}
                        </a>
                        <span v-else>
                            {{ scope.row.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="64"
                    width="200px"
                    label="修改时间"
                >
                    <template slot-scope="scope">
                        {{ scope.row.modified_at | parseTime }}
                    </template>
                </el-table-column>
            </el-table>
            <div slot="footer">
                <el-button
                    class="cancel-move"
                    type="primary"
                    @click="cancel"
                >
                    取消
                </el-button>
                <el-button
                    class="confirm-move"
                    type="primary"
                    @click="confirm"
                >
                    选择
                </el-button>
            </div>
        </sdxu-dialog>
    </div>
</template>

<script>
import { cephLs } from '../../../datas/rely/fileApis';

export default {
    name: 'PathSelector',
    data() {
        return {
            selectedPathTmp: [],
            selectedPath: '',
            visible: false,
            targetFolders: [],
            showLoading: false,
            pFolder: {
                name: '..',
                type: 0, // 0代表返回上一级
                folders: [],
                curFolder: ''
            }
        };
    },
    computed: {
        fileIcon() {
            return this.type === 'file' ? 'icon-file-normal' : 'icon-file-dir';
        },
        _targetFolders() {
            if (this.pFolder.curFolder) {
                return [this.pFolder, ...this.targetFolders];
            } else {
                return this.targetFolders;
            }
        },
        userName() {
            return this.$store.state.user.user.name;
        }
    },
    props: {
        btnText: {
            type: String,
            default: '选择文件'
        },
        type: {
            // 'file','path',分别对应选择文件和选择路径
            type: String,
            default: 'file'
        },
        path: {
            type: String, Array,
            default: ''
        },
        multi: {
            type: Boolean,
            default: false
        }
    },
    model: {
        prop: 'path',
        event: 'change'
    },
    watch: {
        path(val) {
            this.selectedPath = val;
        },
        selectedPath(val) {
            this.$emit('change', val);
        },
        visible(val) {
            if (!val) {
                this.$emit('blur');
            }
        }
    },
    methods: {
        selectFile() {
            this.visible = true;
            if (this.multi) {
                this.selectedPathTmp = _.cloneDeep(this.selectedPath);
            } else {
                this.selectedPathTmp = this.selectedPath;
            }
        },
        isRowSelected(row) {
            if (this.multi) {
                return this.selectedPathTmp.indexOf(row.fullpath) >= 0;
            } else {
                return this.selectedPathTmp === row.fullpath;
            }
        },
        onSelectRow(row) {
            if (((this.type === 'file' && !row.is_dir) ||
                    (this.type === 'path' && row.is_dir))
                    && row.type !== 0
            ) {
                if (this.isRowSelected(row)) {
                    if (this.multi) {
                        let index = this.selectedPathTmp.findIndex(item => item === row.fullpath);
                        this.selectedPathTmp.splice(index, 1);
                    } else {
                        this.selectedPathTmp = '';
                    }
                } else {
                    if (this.multi) {
                        this.selectedPathTmp.push(row.fullpath);
                    } else {
                        this.selectedPathTmp = row.fullpath;
                    }
                }
            }
        },
        cancel() {
            this.visible = false;
        },
        confirm() {
            if (this.multi) {
                this.selectedPath = _.cloneDeep(this.selectedPathTmp);
            } else {
                this.selectedPath = this.selectedPathTmp;
            }
            this.visible = false;
        },
        toFolders(curFolder) {
            // 返回上一级 type === 0 表示 .. 文件夹,返回上一级
            if (curFolder.type === 0) {
                let _targetFolders = this.pFolder.folders;
                let folder = _targetFolders[0];
                // 如果第一个文件夹是 .. 文件夹,表示这个文件夹还有上级目录,切换 pFolder指向
                if (folder.name === '..') {
                    this.pFolder = { ..._targetFolders[0] };
                } else {
                    // 如果第一个文件夹不是 .. 文件,表示这是家目录,删除curFolder;
                    this.pFolder.curFolder = '';
                }
                this.targetFolders = [..._targetFolders];
            } else {
                // 跳转到子文件夹
                // 把当前文件夹赋给父文件夹
                this.pFolder.folders = _.cloneDeep(this._targetFolders);
                this.pFolder.curFolder = { ...curFolder };
                this.fetchFolders(curFolder.path);
            }
        },
        fetchFolders(path) {
            this.showLoading = true;
            cephLs({
                path,
                only_dir: this.type === 'path'
            }).then(res => {
                this.targetFolders = res.paths;
                this.showLoading = false;
            }).catch(err => {
                this.showLoading = false;
            });
        },
        rowClassNameFn({ row }) {
            if (this.isRowSelected(row)) {
                return 'active';
            } else {
                return '';
            }
        }
    },
    mounted() {
        this.selectedPath = this.path;
        this.fetchFolders(this.userName);
    }
};
</script>

<style lang="scss" scoped>
    .path-selector {
        .path-indicator {
            font-size: 14px;
            color: #999;
            margin-top: 10px;
            line-height: 1.2;
            span {
                margin-left: 10px;
            }
        }
        .path-selector-dialog {
            .selector-dialog-title {
                color: #fff;
                font-size: 20px;
            }
            .selector-file-icon {
                width: 18px;
                height: 18px;
                display: inline-block;
                vertical-align: middle;
                &.dir-icon-class {
                    background: url('../../../../assets/images/dir.png') no-repeat center
                    scroll;
                }
                &.user-file-icon {
                    background: url('../../../../assets/images/file.png') no-repeat center
                    scroll;
                }
            }

        }
    }
</style>
<style lang="scss">
    .path-select-table {
        .el-table__row.active {
            background: #00a4ee !important;
            color: #fff;
        }
    }
</style>
