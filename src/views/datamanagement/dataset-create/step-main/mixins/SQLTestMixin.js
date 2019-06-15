import { fetchDbTablesBySource } from '../../../../datas/rely/dataSourceApi';

export default {
    data() {
        return {
            isFetchingOptions: false
        };
    },
    methods: {
        fetchDBTables(source) {
            fetchDbTablesBySource(source).then(res => {
                this.tableNameList = res.table_name;
                this.isFetchingOptions = false;
            }).catch(() => {
                this.tableNameList = [];
                this.isFetchingOptions = false;
            });
        }
    },
    watch: {
        source: {
            immediate: true,
            handler(val) {
                if (val && val.split('@')[0] === '3') {
                    console.log(val);
                    this.fetchDBTables(val.split('@')[1]);
                }
            }
        }
    }
};
