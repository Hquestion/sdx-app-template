import { mapState } from 'vuex';
export default {
    computed: {
        ...mapState({
            currentRole: '',
            isStruct: state => state.dataset.creatingType === 'STRUCT'
        })
    },
    methods: {
        beforeNextStep() {
            // 下一步之前做一些事情，resolve以继续或者reject以中断
            if (this.$refs.comp) {
                return this.$refs.comp.beforeNextStep();
            } else {
                return new Promise((resolve, reject) => {
                    this.$refs.form.validate().then(res => {
                        this.syncStore();
                        resolve(res);
                    }, reject);
                });
            }
        },
        syncStore() {
            // 在每个文件中重写
        }
    }
};
