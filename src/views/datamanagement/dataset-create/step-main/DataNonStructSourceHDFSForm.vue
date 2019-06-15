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
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import StepChangeHooks from './mixins/StepChangeHooks';

export default {
    name: 'DataNonStructSourceHDFSForm',
    mixins: [StepChangeHooks],
    data() {
        return {
            params: {
                file: this.$store.state.dataset.form.nonStructDataSource.hdfs.file || ''
            },
            rules: {
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
            'setNonStructDataSource'
        ]),
        syncStore() {
            this.setNonStructDataSource({
                params: this.params,
                type: '2'
            });
        }
    }
};
</script>

<style scoped>

</style>
