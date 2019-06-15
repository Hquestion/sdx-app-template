<template>
    <div class="step-base-info">
        <el-form
            ref="form"
            :model="params"
            :rules="rules"
            label-width="100px"
            label-position="left"
        >
            <el-form-item
                label="数据集名称"
                prop="datasetName"
            >
                <el-input
                    v-model="params.datasetName"
                    placeholder="请输入数据集名称"
                />
            </el-form-item>
            <el-form-item
                label="数据集描述"
                prop="datasetDesc"
            >
                <el-input
                    type="textarea"
                    v-model="params.datasetDesc"
                    placeholder="请输入数据集描述"
                />
            </el-form-item>
            <el-form-item
                label="数据集标签"
                prop="datasetLabel"
            >
                <el-select
                    style="width: 100%;"
                    v-model="params.datasetLabel"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="请选择或输入数据集标签"
                    :loading="isLoadingOptions"
                    :multiple-limit="2"
                >
                    <el-option
                        v-for="item in labelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <!--<el-form-item label="数据集共享" prop="rights">-->
            <!--<el-radio-group v-model="params.rights">-->
            <!--<el-radio label="1">私有</el-radio>-->
            <!--<el-radio label="2">组内</el-radio>-->
            <!--<el-radio label="3" v-if="currentRole === 'admin'">公共</el-radio>-->
            <!--</el-radio-group>-->
            <!--</el-form-item>-->
        </el-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import StepChangeHooks from './mixins/StepChangeHooks';
import { isDatasetNameExist, getDataTag } from '../../../datas/rely/dataSourceApi';
export default {
    name: 'StepBaseInfo',
    mixins: [StepChangeHooks],
    data() {
        return {
            params: {
                datasetName: this.$store.state.dataset.form.baseInfo.datasetName || '',
                datasetDesc: this.$store.state.dataset.form.baseInfo.datasetDesc || '',
                datasetLabel: this.$store.state.dataset.form.baseInfo.datasetLabel || []
                // rights: this.$store.state.dataset.form.baseInfo.rights || '1'
            },
            rules: {
                datasetName: [
                    {
                        required: true, message: '请输入数据集名称', trigger: 'blur'
                    },
                    { pattern: /^[a-zA-Z][a-zA-Z_0-9]{3,20}$/, message: '请输入4到20位，字母开头，数字、字母、下划线、点组成的字符串', trigger: 'blur' },
                    { validator: this.checkNameRepeat, trigger: 'blur' }
                ],
                datasetDesc: [
                    {
                        required: true, message: '请输入数据集描述', trigger: 'blur', transform(value) {
                            return value && ('' + value).trim();
                        }
                    }
                ],
                datasetLabel: [
                    {
                        validator: this.checkTagLengthLimit, trigger: 'change'
                    }
                ]
                // rights: [
                //     { required: true, message: '请设置数据集访问权限', trigger: 'blur' }
                // ]
            },
            labelOptions: [],
            isLoadingOptions: false
        };
    },
    methods: {
        ...mapActions([
            'setDatasetBaseInfo',
            'setCreatingFlag'
        ]),
        checkNameRepeat(rule, value, cb) {
            isDatasetNameExist(value).then(res => {
                if (res.exist) {
                    cb('数据集名称已存在！');
                } else {
                    cb();
                }
            }).catch(cb);
        },
        checkTagLengthLimit(rule, value, cb) {
            const reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
            for (let i = 0; i < value.length; i++) {
                if (!reg.test(value[i])) {
                    return cb('标签仅支持中文和字母！');
                }
                const length = value[i].replace(/[\u4e00-\u9fa5]/g, 'aa').length;
                if (length > 10) {
                    return cb('标签不能超过10个字符！');
                }
            }
            cb();
        },
        initLabelOptions() {
            // pass
            this.isLoadingOptions = true;
            getDataTag().then(res => {
                this.labelOptions = res.options;
                this.isLoadingOptions = false;
            });
        },
        syncStore() {
            // 同步store内数据
            this.setDatasetBaseInfo(this.params);
        }
    },
    watch: {
        params: {
            deep: true,
            handler(val) {
                if (val.datasetName || val.datasetDesc || val.rights) {
                    this.setCreatingFlag(true);
                }
            }
        }
    },
    mounted() {
        this.initLabelOptions();
    }
};
</script>

<style scoped>

</style>
