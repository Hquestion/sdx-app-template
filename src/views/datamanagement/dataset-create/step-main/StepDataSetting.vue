<template>
    <div class="step-data-setting">
        <el-form
            :model="params"
            :rules="rules"
            label-width="105px"
            ref="form"
            label-position="left"
        >
            <ContentCateHeader title="示例数据提取" />
            <StepContentPanel>
                <el-form-item
                    label="抽样方式"
                    prop="sampling"
                >
                    <el-select
                        v-model="params.sampling"
                        placeholder="请选中抽样方式"
                        :value="params.sampling"
                        style="width:100%;"
                    >
                        <el-option
                            label="前N条"
                            value="topN"
                        />
                        <el-option
                            label="后N条"
                            value="lastN"
                            :disabled="true"
                        />
                        <el-option
                            label="随机取样（条数）"
                            value="randomNum"
                            :disabled="true"
                        />
                        <el-option
                            label="随机取样（百分比）"
                            value="randomPercent"
                            :disabled="true"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="samplingNum"
                >
                    <div class="sampling-input">
                        <span style="margin-right: 5px">
                            {{ samplingLabel }}
                        </span>
                        <el-input-number
                            v-model="params.samplingNum"
                            :min="1"
                            :max="params.sampling === 'randomPercent' ? 100: 1000"
                        />
                        <span style="margin-left: 5px">
                            {{ params.sampling === 'randomPercent' ? '%' : '条' }}
                        </span>
                    </div>
                </el-form-item>
            </StepContentPanel>
            <ContentCateHeader title="Schema生成" />
            <StepContentPanel>
                <el-form-item
                    label="Schema生成"
                    prop="schema"
                >
                    <el-select
                        v-model="params.schema"
                        placeholder="请选中schema生成方式"
                        :value="params.schema"
                        style="width:100%;"
                    >
                        <el-option
                            label="自动生成"
                            value="auto"
                        />
                        <el-option
                            label="上传"
                            value="upload"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label=""
                    prop="schemaFile"
                    v-if="params.schema === 'upload'"
                >
                    <div class="sampling-input">
                        <!--<file-select-->
                        <!--:fullpath="true"-->
                        <!--btn-label="选择文件"-->
                        <!--v-model="params.schemaFile"-->
                        <!--:filter="['.csv']"-->
                        <!--:click-kind="5"-->
                        <!--@blur="$refs.form.validateField('schemaFile')"-->
                        <!--/>-->
                        <SdxwFileSelect
                            type="all"
                            :limit="1"
                            accept=".csv"
                            upload-btn-label="选择文件"
                            v-model="params.schemaFile"
                            :path="uploadPath"
                            :ceph-params="{ clickKind: 5, richModel: false }"
                        />
                        <a
                            :href="STATIC_PATH + 'static/sample_schema.csv'"
                            title="样本文件"
                            style="color:#1681de;"
                        >
                            <i
                                class="iconfont icon-ico_file"
                                style="margin-right: 5px;"
                            />样本文件
                        </a>
                    </div>
                </el-form-item>
            </StepContentPanel>
            <ContentCateHeader title="Schema设置" />
            <StepContentPanel
                v-loading="isLoadingSchema"
                ref="tableContainer"
            >
                <CusElTable
                    :data="lazyShowData"
                    stripe
                    :max-height="400"
                    ref="table"
                    :lazy="true"
                    :lazy-top-height="topHeight"
                    :lazy-bottom-height="bottomHeight"
                    style="width: 100%;border-left:1px solid #ebeef5;
                          border-right:1px solid #ebeef5;border-top:1px solid #ebeef5;"
                >
                    <el-table-column
                        prop="fieldName"
                        label="字段"
                    />
                    <el-table-column
                        prop="fieldType"
                        label="数据类型"
                    >
                        <template slot-scope="scope">
                            <el-dropdown
                                @command="(command) => handleChangeType(command, scope.row)"
                                trigger="click"
                                v-if="canTransformTypesMap[scope.row.fieldType] && canTransformTypesMap[scope.row.fieldType].length > 0"
                            >
                                <span class="el-dropdown-link">
                                    {{ scope.row.fieldType || '未知' }}
                                    <a><i class="el-icon-arrow-down el-icon--right" /></a>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item
                                        v-for="item in (canTransformTypesMap[scope.row.fieldType] || [])"
                                        :key="item"
                                        :class="{active: item === scope.row.fieldType}"
                                        :command="item"
                                    >
                                        {{ item }}
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span v-else>
                                {{ scope.row.fieldType || '未知' }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column label="允许空值">
                        <template slot-scope="scope">
                            <el-checkbox
                                v-model="scope.row.nullable"
                                :disabled="true"
                                @change="params.schemaChanged = true"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <a
                                title="删除"
                                @click.prevent.stop="deleteColumn(scope.$index, scope.row)"
                            >
                                <i
                                    class="iconfont icon-ico_delet"
                                />
                            </a>
                        </template>
                    </el-table-column>
                </CusElTable>
            </StepContentPanel>
        </el-form>
    </div>
</template>

<script>
import ContentCateHeader from './ContentCateHeader';
import StepContentPanel from './StepContentPanel';
import { schemaColumnTypes, canTransformTypesMap } from '../config';
import PathSelector from './PathSelector';
import StepChangeHooks from './mixins/StepChangeHooks';
import { generateSchema, uploadSchemaFile } from '../../../datas/rely/dataSourceApi';
import { mapActions } from 'vuex';
import CreateRequestParamMixin from './mixins/CreateRequestParamMixin';
// import FileSelect from '../../../../components/project/formItems/fileSelect';
import CusElTable from '../../../datas/rely/table';
import SkyFormWidgetUpload from '../../../datas/rely/SkyForm/InputWidgets/SkyFormWidgetUpload';

export default {
    name: 'StepDataSetting',
    mixins: [StepChangeHooks, CreateRequestParamMixin],
    components: {
        SkyFormWidgetUpload,
        // FileSelect,
        PathSelector,
        StepContentPanel,
        ContentCateHeader,
        CusElTable
    },
    data() {
        return {
            STATIC_PATH: process.env.VUE_APP_STATIC_PATH,
            params: {
                samplingNum: this.$store.state.dataset.form.structDataSetting.samplingNum || 1000,
                sampling: this.$store.state.dataset.form.structDataSetting.sampling || 'topN',
                schemaFile: this.$store.state.dataset.form.structDataSetting.schemaFile || [],
                schema: this.$store.state.dataset.form.structDataSetting.schema || 'auto',
                schemaList: this.$store.state.dataset.form.structDataSetting.schemaList || [],
                schemaChanged: this.$store.state.dataset.form.structDataSetting.schemaChanged || false
            },
            rules: {
                samplingNum: [
                    {
                        required: true, message: '请输入抽样数量', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                sampling: [
                    { required: true, message: '请选择抽样方式', trigger: 'change' }
                ],
                schemaFile: [
                    { required: true, message: '请选择schema文件', trigger: 'blur' }
                ],
                schema: [
                    { required: true, message: '请选择schema生成方式', trigger: 'change' }
                ]
            },
            schemaColumnTypes,
            canTransformTypesMap,
            isLoadingSchema: false,
            topCount: 0,
            rowHeight: 48,
            lazyShowData: [],
            uploadPath: [this.$store.state.user.user.name, '.upload']
        };
    },
    computed: {
        samplingLabel() {
            return ({
                topN: '前',
                lastN: '后',
                randomNum: '随机',
                randomPercent: '随机'
            }[this.params.sampling]);
        },
        topHeight() {
            if (this.$el) {
                this.$nextTick(() => {
                    this.$el.querySelector('.el-table__body-wrapper').scrollTop = this.$el.$$tableLastScrollTop;
                });
            }
            return this.topCount * this.rowHeight;
        },
        bottomHeight() {
            return (this.params.schemaList.length - this.lazyShowData.length - this.topCount || 0) * this.rowHeight;
        }
    },
    methods: {
        ...mapActions([
            'setStructDataSetting'
        ]),
        deleteColumn(index) {
            this.$confirm('确认删除此列？', {
                type: 'warning'
            }).then(() => {
                this.params.schemaChanged = true;
                this.params.schemaList.splice(index, 1);
            });
        },
        handleChangeType(command, row) {
            if (row.fieldType !== command) {
                this.params.schemaChanged = true;
                row.fieldType = command;
            }
        },
        updateSchemaList() {
            if (this.params.samplingNum && this.params.sampling) {
                if (this.params.schema === 'auto') {
                    this.doGenerateSchema();
                    this.params.schemaChanged = false;
                } else if (this.params.schema === 'upload' && this.params.schemaFile) {
                    this.params.schemaChanged = true;
                    this.doUploadSchema();
                }
            }
        },
        doUploadSchema() {
            this.isLoadingSchema = true;
            uploadSchemaFile(this.params.schemaFile).then(res => {
                this.params.schemaList = res;
                this.isLoadingSchema = false;
            }).catch(err => {
                this.params.schemaList = [];
                this.isLoadingSchema = false;
            });
        },
        doGenerateSchema() {
            this.isLoadingSchema = true;
            let params = this.createGenerateSchemaReqParam();
            generateSchema(params).then(res => {
                this.params.schemaList = res;
                this.isLoadingSchema = false;
            }).catch(err => {
                this.params.schemaList = [];
                this.isLoadingSchema = false;
            });
        },
        beforeNextStep() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate().then(res => {
                    if (this.params.schemaList && this.params.schemaList.length > 0) {
                        this.syncStore();
                        resolve(res);
                    } else {
                        this.$message.error('生成schema失败，请重试以生成schema!');
                        reject();
                    }
                }, reject);
            });
        },
        syncStore() {
            this.setStructDataSetting(this.params);
        }
    },
    watch: {
        'params.samplingNum'() {
            this.updateSchemaList();
        },
        'params.sampling'(val) {
            if (val === 'randomPercent') {
                if (this.params.samplingNum > 100) {
                    this.params.samplingNum = 100;
                } else {
                    this.updateSchemaList();
                }
            } else {
                this.updateSchemaList();
            }
        },
        'params.schemaFile'() {
            this.updateSchemaList();
        },
        'params.schema'() {
            this.updateSchemaList();
        },
        'params.schemaList': {
            immediate: true,
            handler() {
                if (this.params.schemaList && this.params.schemaList.length > 0) {
                    this.$nextTick(() => {
                        let $viewport = this.$el.querySelector('.el-table__body-wrapper');
                        let viewportHeight = $viewport.offsetHeight;
                        let visibleCount = Math.ceil(viewportHeight / this.rowHeight);
                        this.lazyShowData = this.params.schemaList.slice(this.topCount, this.topCount + visibleCount + 2);
                        this.$refs.table.doLayout();
                    });
                }
            }
        },
        topCount: {
            immediate: true,
            handler() {
                if (this.params.schemaList && this.params.schemaList.length > 0) {
                    this.$nextTick(() => {
                        let $viewport = this.$el.querySelector('.el-table__body-wrapper');
                        let viewportHeight = $viewport.offsetHeight;
                        let visibleCount = Math.ceil(viewportHeight / this.rowHeight);
                        this.lazyShowData = this.params.schemaList.slice(this.topCount, this.topCount + visibleCount + 5);
                        this.$refs.table.doLayout();
                    });
                }
            }
        }
    },
    mounted() {
        if (!this.params.schemaList || this.params.schemaList.length === 0) {
            this.updateSchemaList();
        }
        this.scrollFn = e => {
            let scrollTop = e.target.scrollTop;
            if (scrollTop !== this.$el.$$tableLastScrollTop) {
                this.$el.$$tableLastScrollTop = scrollTop;
                let topCount = Math.floor(scrollTop / this.rowHeight);
                this.topCount = (topCount - 5 > 0 ? topCount - 5 : 0);
            }
        };
        this.$el.querySelector('.el-table__body-wrapper').addEventListener('scroll', this.scrollFn);
    },
    beforeDestroy() {
        this.$el.querySelector('.el-table__body-wrapper').removeEventListener('scroll', this.scrollFn);
    }
};
</script>

<style lang="scss" scoped>
    .step-data-setting {
        margin-top: -20px;
        padding: 0 !important;
    }
</style>
