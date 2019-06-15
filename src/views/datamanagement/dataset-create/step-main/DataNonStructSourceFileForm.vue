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
                label="选择文件"
                prop="file"
            >
                <SdxwFileSelect
                    :fullpath="true"
                    :can-check-folder="true"
                    v-model="params.file"
                    btn-label="选择文件"
                    :click-kind="5"
                    @blur="$refs.form.validateField('file')"
                />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import StepChangeHooks from './mixins/StepChangeHooks';
// import FileSelect from '../../../../components/project/formItems/fileSelect';

export default {
    name: 'DataNonStructSourceFileForm',
    mixins: [StepChangeHooks],
    components: { },
    data() {
        return {
            params: {
                file: this.$store.state.dataset.form.nonStructDataSource.local.file || ''
            },
            rules: {
                file: [
                    {
                        required: true, message: '请选择DataSource文件', trigger: 'blur'
                    }
                ]
            }
        };
    },
    methods: {
        ...mapActions([
            'setNonStructDataSource'
        ]),
        syncStore() {
            this.setNonStructDataSource({
                params: this.params,
                type: '1'
            });
        }
    }
};
</script>

<style scoped>

</style>
