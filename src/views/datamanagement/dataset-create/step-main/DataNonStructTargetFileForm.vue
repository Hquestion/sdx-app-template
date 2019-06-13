<template>
    <div class="data-non-struct-target-file-form">
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
                v-if="false"
            >
                <el-select
                    v-model="params.fileType"
                    style="width: 100%;"
                    placeholder="请选择文件类型"
                >
                    <el-option
                        :label="item"
                        :value="item"
                        v-for="item in dataFileTypes"
                        :key="item"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="存储目录"
                prop="savePath"
            >
                <SdxwFileSelect
                    :fullpath="true"
                    :can-check-folder="true"
                    :only-folder="true"
                    v-model="params.savePath"
                    btn-label="选择路径"
                    :click-kind="7"
                    @blur="$refs.form.validateField('savePath')"
                />
            </el-form-item>
            <el-form-item
                label="存储方式"
                prop="saveType"
                v-if="false"
            >
                <el-select
                    v-model="params.saveType"
                    style="width: 100%;"
                    placeholder="请选择存储方式"
                >
                    <el-option
                        :label="item.label"
                        :value="item.value"
                        :key="item.value"
                        v-for="item in SAVE_TYPE_OPTIONS"
                    />
                </el-select>
            </el-form-item>
            <el-form-item
                label="数据集共享"
                prop="rights"
                :required="true"
            >
                <el-radio-group v-model="params.rights">
                    <el-radio label="1">
                        私有
                    </el-radio>
                    <el-radio label="2">
                        组内
                    </el-radio>
                    <el-radio
                        label="3"
                        v-if="currentRole === 'admin'"
                    >
                        公共
                    </el-radio>
                </el-radio-group>
                <FormTip v-if="params.rights !== '1'">
                    分享后，您的数据集可以被其他用户查看和使用
                </FormTip>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { nonStructFileTypes, SAVE_TYPE_OPTIONS } from '../config';
import StepChangeHooks from './mixins/StepChangeHooks';
import { mapActions } from 'vuex';
// import FileSelect from '../../../../components/project/formItems/fileSelect';
import FormTip from '../../../datas/rely/SkyForm/FormTip';

export default {
    name: 'DataNonStructTargetFileForm',
    mixins: [StepChangeHooks],
    components: {
        FormTip
        // FileSelect
    },
    data() {
        return {
            params: {
                saveType: this.$store.state.dataset.form.nonStructDataTarget.local.storeType || SAVE_TYPE_OPTIONS[0].value,
                fileType: this.$store.state.dataset.form.nonStructDataTarget.local.fileType || 'Avro',
                savePath: this.$store.state.dataset.form.nonStructDataTarget.local.file || '',
                rights: this.$store.state.dataset.form.nonStructDataTarget.local.rights || '1'
            },
            dataFileTypes: nonStructFileTypes,
            rules: {
                // fileType: [
                //     { required: true, message: '请选择文件类型', trigger: 'change' }
                // ],
                savePath: [
                    { required: true, message: '请选择保存路径', trigger: 'blur' }
                ]
                // saveType: [
                //     { required: true, message: '请选择存储方式', trigger: 'change' }
                // ]
            },
            SAVE_TYPE_OPTIONS
        };
    },
    methods: {
        ...mapActions([
            'setNonStructDataTarget'
        ]),
        syncStore() {
            this.setNonStructDataTarget({
                params: this.params,
                type: '1'
            });
        }
    }
};
</script>

<style scoped>

</style>
