<template>
    <div class="data-source-file-form">
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
                label="选择文件"
                prop="file"
            >
                <file-select
                    :fullpath="true"
                    v-model="params.file"
                    btn-label="选择文件"
                    :can-check-folder="true"
                    :click-kind="5"
                    @blur="$refs.form.validateField('file')"
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
import { dataFileTypes, CSV_FILE_SPLITOR, dataFileTypeExt } from '../config';
import StepChangeHooks from './mixins/StepChangeHooks';
import { mapActions } from 'vuex';
// import FileSelect from '../../../../components/project/formItems/fileSelect';
import FormTip from '../../../datas/rely/SkyForm/FormTip';

export default {
    name: 'DataSourceFileForm',
    mixins: [StepChangeHooks],
    components: { FormTip },
    data() {
        return {
            params: {
                fileType: this.$store.state.dataset.form.structDataSource.local.fileType || 'CSV',
                autoIdentification: true,
                firstLineAsSchema: this.$store.state.dataset.form.structDataSource.local.firstLineAsSchema || false,
                splitor: this.$store.state.dataset.form.structDataSource.local.splitor || ',',
                charset: this.$store.state.dataset.form.structDataSource.local.charset || 'UTF-8',
                file: this.$store.state.dataset.form.structDataSource.local.file || '',
                quote: this.$store.state.dataset.form.structDataSource.local.quote || '"',
                escape: this.$store.state.dataset.form.structDataSource.local.escape || '\\'
            },
            rules: {
                fileType: [
                    { required: true, message: '请选择文件类型', trigger: 'change' }
                ],
                charset: [
                    { required: true, message: '请选择数据集编码', trigger: 'change' }
                ],
                file: [
                    { required: true, message: '请选择DataSource文件', trigger: 'blur' },
                    { validator: this.checkFileType, trigger: 'blur' }
                ]
            },
            dataFileTypes,
            CSV_FILE_SPLITOR
        };
    },
    computed: {
        sourceFileExt() {
            return dataFileTypeExt[this.params.fileType];
        }
    },
    methods: {
        ...mapActions([
            'setStructDataSource'
        ]),
        checkFileType(rule, value, cb) {
            // let pathNames = value.split('/');
            // if (pathNames.length > 0) {
            //     let names = pathNames[pathNames.length - 1].split('.');
            //     if (('.' + names[names.length - 1].toUpperCase()) === this.sourceFileExt.toUpperCase()) {
            //         cb();
            //     } else {
            //         cb('文件类型与选择类型不一致');
            //     }
            // }
            cb();
        },
        syncStore() {
            this.setStructDataSource({
                params: this.params,
                type: '1'
            });
        }
    }
};
</script>

<style lang="scss" scoped>
    .data-source-file-form {

    }
</style>
