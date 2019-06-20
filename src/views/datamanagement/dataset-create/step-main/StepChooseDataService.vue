<template>
    <div class="step-choose-data-service">
        <el-form
            ref="form"
            :model="params"
            :rules="rules"
            label-width="100px"
            label-position="left"
        >
            <el-form-item
                label="数据服务"
                prop="dataService"
            >
                <el-select
                    v-model="params.dataService"
                    placeholder="请选择"
                    style="width:100%;"
                >
                    <el-option
                        v-for="item in serviceList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getServiceOptions } from '../../../datas/rely/serviceApis';
import { mapActions } from 'vuex';
import StepChangeHooks from './mixins/StepChangeHooks';
export default {
    name: 'StepChooseDataService',
    mixins: [StepChangeHooks],
    data() {
        return {
            params: {
                dataService: this.$store.state.dataset.form.dataServiceInfo.dataService
            },
            serviceList: [],
            rules: {
                dataService: [
                    { required: true, message: '请选择数据服务', trigger: 'change' }
                ]
            }
        };
    },
    methods: {
        ...mapActions([
            'setDataService'
        ]),
        init() {
            // 获取数据服务列表
            this.getServiceList().then(res => {
                this.serviceList = res;
            });
        },
        getServiceList: async() => {
            const { options } = await getServiceOptions();
            return options;
        },
        syncStore() {
            // 同步store内数据
            this.setDataService(this.params);
        }
    },
    mounted() {
        this.init();
    }
};
</script>

<style scoped>

</style>
