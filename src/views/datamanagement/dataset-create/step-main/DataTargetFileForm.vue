<template>
    <div class="data-target-file-form">
        <el-form
            :model="params"
            :rules="rules"
            label-width="100px"
            ref="form"
            label-position="left"
        >
            <template v-if="isStruct">
                <el-form-item
                    label="分区："
                    prop="partition"
                >
                    <el-select
                        v-model="params.partition"
                        multiple
                        style="width: 100%;"
                        placeholder="请选择分区"
                    >
                        <el-option
                            v-for="item in schemaColumns"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="存储方式："
                    prop="saveType"
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
                    label="文件类型："
                    prop="fileType"
                >
                    <el-select
                        v-model="params.fileType"
                        style="width: 100%;"
                        placeholder="请选择文件类型"
                    >
                        <el-option
                            :label="item"
                            :value="item"
                            v-for="item in limitedSaveTypes"
                            :key="item"
                        />
                    </el-select>
                    <FormTip v-if="params.fileType === 'CSV'">
                        转存的csv文件的分隔符为“,”；首行为schema；编码为UTF-8；
                    </FormTip>
                </el-form-item>
            </template>
            <el-form-item
                label="存储目录："
                prop="savePath"
            >
                <SkyFormWidgetUpload
                    type="ceph"
                    :limit="1"
                    v-model="params.savePath"
                    :path="[]"
                    :ceph-params="{ clickKind: 7, richModel: false, btnLabel: '选择路径', canCheckFolder: true, onlyFolder: true, filter: (item) => item.is_dir}"
                />
            </el-form-item>
            <el-form-item
                label="数据集共享："
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
import { SAVE_TYPE_OPTIONS } from '../config';
import StepChangeHooks from './mixins/StepChangeHooks';
import TargetFileTypeLimitMixin from './mixins/TargetFileTypeLimitMixin';
import { mapActions } from 'vuex';
import FormTip from '../../../datas/rely/SkyForm/FormTip';
import SkyFormWidgetUpload from '../../../datas/rely/SkyForm/InputWidgets/SkyFormWidgetUpload';

export default {
    name: 'DataTargetFileForm',
    mixins: [StepChangeHooks, TargetFileTypeLimitMixin],
    components: {
        FormTip,
        SkyFormWidgetUpload
    },
    data() {
        return {
            params: {
                partition: this.$store.state.dataset.form.structDataTarget.local.partition || [],
                saveType: this.$store.state.dataset.form.structDataTarget.local.saveType || SAVE_TYPE_OPTIONS[0].value,
                fileType: this.$store.state.dataset.form.structDataTarget.local.fileType || 'CSV',
                savePath: this.$store.state.dataset.form.structDataTarget.local.savePath || [],
                rights: this.$store.state.dataset.form.structDataTarget.local.rights || '1'
            },
            rules: {
                partition: [
                    { validator: this.checkPartition, trigger: 'change' }
                ],
                saveType: [
                    { required: true, message: '请选择存储方式', trigger: 'change' }
                ],
                fileType: [
                    { required: true, message: '请选择文件类型', trigger: 'change' }
                ],
                savePath: [
                    { required: true, message: '请选择文件存储目录', trigger: 'blur' }
                ]
            },
            SAVE_TYPE_OPTIONS
        };
    },
    computed: {
        schemaColumns() {
            return this.$store.state.dataset.form.structDataPreProcessing.destSchema.map(item => ({ label: item.fieldName, value: item.fieldName }));
        }
    },
    methods: {
        ...mapActions([
            'setStructDataTarget'
        ]),
        syncStore() {
            console.log('同步store');
            this.setStructDataTarget({
                params: this.params,
                type: this.$parent.targetType
            });
        },
        checkPartition(rule, value, cb) {
            if (this.schemaColumns.length > 0 && value.length === this.schemaColumns.length) {
                cb('不可以将所有字段选作为分区字段');
            } else {
                cb();
            }
        }
    }
};
</script>

<style scoped>

</style>
