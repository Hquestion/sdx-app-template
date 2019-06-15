<template>
    <div class="data-source-hdfs-form">
        <el-form
            :model="params"
            :rules="rules"
            label-width="100px"
            ref="form"
            label-position="left"
        >
            <el-form-item
                label="文件类型"
                prop="fileType"
            >
                <el-select
                    v-model="params.fileType"
                    placeholder="请选择文件类型"
                    style="width:100%;"
                >
                    <el-option
                        :label="item"
                        :value="item"
                        v-for="item in dataFileTypes"
                        :key="item"
                    />
                </el-select>
                <FormTip v-if="params.fileType === 'JSON'">
                    目前不支持读取标准的 json 文件。需要预先把标准的 json 文件处理成以下格式: 每一行是一个 json 对象
                </FormTip>
            </el-form-item>
            <el-form-item
                label="文件路径"
                prop="file"
            >
                <el-input
                    v-model="params.file"
                    placeholder="请输入文件路径"
                >
                    <template slot="prepend">
                        hdfs://
                    </template>
                </el-input>
                <HdfsSelect
                    :source="targetDatasource"
                    :only-folder="true"
                />
            </el-form-item>
            <el-form-item
                label="自动识别"
                prop="autoIdentification"
                v-if="params.fileType==='CSV'"
                v-show="false"
            >
                <el-switch v-model="params.autoIdentification" />
            </el-form-item>
            <el-form-item
                label="首行Schema"
                prop="firstLineAsSchema"
                v-if="params.fileType==='CSV' || params.fileType==='TEXT'"
            >
                <el-switch v-model="params.firstLineAsSchema" />
            </el-form-item>
            <el-form-item
                label="分隔符"
                prop="splitor"
                v-if="params.fileType==='CSV' || params.fileType==='TEXT'"
            >
                <el-select
                    allow-create
                    filterable
                    v-model="params.splitor"
                    placeholder="请选择或输入分隔符"
                    style="width:100%;"
                >
                    <el-option
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                        v-for="item in CSV_FILE_SPLITOR"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="引用字符"
                prop="quote"
                v-if="params.fileType==='CSV' || params.fileType==='TEXT'"
            >
                <el-select
                    allow-create
                    filterable
                    v-model="params.quote"
                    placeholder="请选择或输入引用字符"
                    style="width:100%;"
                >
                    <el-option
                        label="无"
                        value=""
                    />
                    <el-option
                        label="&quot;"
                        value="&quot;"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="转义字符"
                prop="escape"
                v-if="params.fileType==='CSV' || params.fileType==='TEXT'"
            >
                <el-select
                    allow-create
                    filterable
                    v-model="params.escape"
                    placeholder="请选择或输入转义字符"
                    style="width:100%;"
                >
                    <el-option
                        label="无"
                        value=""
                    />
                    <el-option
                        label="\"
                        value="\"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="数据集编码"
                prop="charset"
                v-if="params.fileType==='CSV' || params.fileType==='TEXT'"
            >
                <el-select
                    v-model="params.charset"
                    placeholder="请选择数据集编码"
                    style="width:100%;"
                >
                    <el-option
                        label="UTF-8"
                        value="UTF-8"
                    />
                    <el-option
                        label="GB2312"
                        value="GB2312"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import StepChangeHooks from './mixins/StepChangeHooks';
import { dataFileTypes, CSV_FILE_SPLITOR } from '../config';
import { mapActions } from 'vuex';
import FormTip from '../../../datas/rely/SkyForm/FormTip';
import HdfsSelect from '../../../datas/rely/SkyForm/InputWidgets/HdfsSelect';

export default {
    name: 'DataSourceHDFSForm',
    components: {
        FormTip,
        HdfsSelect
    },
    mixins: [StepChangeHooks],
    data() {
        return {
            params: {
                fileType: this.$store.state.dataset.form.structDataSource.hdfs.fileType || 'CSV',
                firstLineAsSchema: this.$store.state.dataset.form.structDataSource.hdfs.firstLineAsSchema || false,
                splitor: this.$store.state.dataset.form.structDataSource.hdfs.splitor || ',',
                charset: this.$store.state.dataset.form.structDataSource.hdfs.charset || 'UTF-8',
                file: this.$store.state.dataset.form.structDataSource.hdfs.file || '',
                quote: this.$store.state.dataset.form.structDataSource.hdfs.quote || '"',
                escape: this.$store.state.dataset.form.structDataSource.hdfs.escape || '\\'
            },
            dataFileTypes,
            CSV_FILE_SPLITOR,
            rules: {
                fileType: [
                    { required: true, message: '请选择文件类型', trigger: 'change' }
                ],
                splitor: [
                    { required: true, message: '请选择分隔符', trigger: 'change' }
                ],
                charset: [
                    { required: true, message: '请选择数据集编码', trigger: 'change' }
                ],
                file: [
                    {
                        required: true, message: '请输入DataSource文件路径', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ]
            }
        };
    },
    methods: {
        ...mapActions([
            'setStructDataSource'
        ]),
        syncStore() {
            this.setStructDataSource({
                params: this.params,
                type: '2'
            });
        }
    }
};
</script>

<style scoped>

</style>
