<template>
    <div class="data-list-view">
        <div
            v-for="(v, k) in list"
            :key="k"
        >
            <div
                @click="viewData(v.fullpath,v.is_dir, v.path)"
                :class="[viewDisabled(v) ?'disabledClick':'', 'card']"
            >
                <div class="icon">
                    <svg
                        class="alSvgIcon"
                        aria-hidden="true"
                    >
                        <use :xlink:href="getExt(v.name,v.is_dir)" />
                    </svg>
                </div>
                <div class="content">
                    <el-tooltip
                        class="item"
                        effect="dark"
                        :content="v.name"
                        placement="top"
                    >
                        <div class="name">
                            {{ v.name }}
                        </div>
                    </el-tooltip>
                    <div class="size">
                        文件大小 {{ v.st_size | bytesToSize }}
                    </div>
                </div>
            </div>
        </div>
        <div
            class="holder"
            v-for="item in 10"
            :key="`holder${item}`"
        >
            &nbsp;
        </div>
    </div>
</template>
<script>
import { cephLs, hdfsLs } from './rely/dataApi';
export default {
    name: 'DatasListView',
    data() {
        return {
            list: [],
            fullpath: ''
        };
    },
    props: {
        dataListPath: {
            type: String,
            default: ''
        },
        storeType: {
            type: String,
            default: ''
        },
        datasource: {
            type: String,
            default: ''
        }

    },
    filters: {
        bytesToSize(bytes) {
            if (typeof bytes === 'undefined') return '';
            // 字节单位转换
            if (bytes === 0) return '0 B';

            let k = 1024;
            let sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            let i = Math.floor(Math.log(bytes) / Math.log(k));

            return Math.floor(bytes / Math.pow(k, i)) + ' ' + sizes[i];
        }
    },

    methods: {
        // icon
        getExt(name, is_dir) {
            let [arr, ext] = [[], ''];
            if (name) {
                arr = name.split('.');
                ext = arr[arr.length - 1];
            }

            if (ext === 'csv') {
                ext = '#icon-CVS-caise';
            } else if (ext === 'txt') {
                ext = '#icon-Txt-caise';
            } else if (ext === 'orc') {
                ext = '#icon-ORC-caise';
            } else if (ext === 'parquet') {
                ext = '#icon-Parquet-caise';
            } else if (is_dir) {
                ext = '#icon-file-dir';
            } else if (ext !== 'csv' && ext !== 'txt' && ext !== 'orc' && ext !== 'parquet' && !is_dir) {
                ext = '#icon-buzhichiyulan';
            }
            return ext;
        },
        // 文件列表
        getFlieList(path) {
            cephLs({ path })
                .then(data => {
                    this.list = data.paths;
                });
        },
        // HDFS 列表
        getHdfsList(datasource, path, only_dir) {
            hdfsLs(datasource, path, only_dir)
                .then(data => {
                    this.list = data.paths;
                });
        },
        // hdfs 或者文件 列表
        getHdfsOrFile(path) {
            if (this.storeType === 'HDFS') {
                this.getHdfsList(this.datasource, path, false);
            } else if (this.storeType === 'FILESYSTEM') {
                this.getFlieList(path);
            }
        },
        // 查看数据
        viewData(fullpath, is_dir, path) {
            let [arr, ext] = [[], ''];
            arr = fullpath.split('.');
            ext = arr[arr.length - 1];
            //  文件夹
            if (is_dir) {
                this.getHdfsOrFile(fullpath);

                this.$emit('expandNode', fullpath, path);
            } else if (ext === 'csv' || ext === 'txt' || ext === 'orc' || ext === 'parquet') {
                this.$emit('viewData', fullpath, path);
            }
        },
        viewDisabled(v) {
            let res = true;
            if (v.name.includes('.csv') || v.name.includes('.txt') || v.name.includes('.orc') || v.name.includes('.parquet') || v.is_dir) {
                res = false;
            }
            return res;
        }
    },
    created() {
        this.getHdfsOrFile(this.dataListPath);
    },
    watch: {
        dataListPath() {
            this.getHdfsOrFile(this.dataListPath);
        }

    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.data-list-view {
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    font-size: 0;
    position: relative;

    .card {
        flex-grow: 0;
        box-sizing: border-box;
        display: block;
        height: 116px;
        width: 268px;
        border: 1px solid $c-split;
        margin-top: 20px;
        padding-top: 6px;
        padding-bottom: 37px;
        position: relative;
        overflow: hidden;
        display: flex;
        cursor: pointer;
        .icon {
            width: 70px;
            text-align: center;
            line-height: 116px;
            font-size: 46px;
            .alSvgIcon {
                width: 1em;
                height: 1em;
                fill: currentColor;
                overflow: hidden;
            }
        }
        .content {
            font-size: 14px;
            height: 116px;
            line-height: 30px;
            padding: 23px 0;
            .name {
                color:rgba(64,69,73,1);
                // height: 58px;
                // line-height: 70px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 188px;
            }
            .size {
                color:rgba(107,113,122,1);
                // height: 58px;
                // line-height: 24px;
            }
        }
    }
    .holder {
        flex-grow: 0;
        width: 268px;
        line-height: 0;
        display: inline-block;
    }
}

</style>
