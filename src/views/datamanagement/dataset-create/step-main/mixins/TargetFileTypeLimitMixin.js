import { dataFileTypes } from '../../config';
import { mapState } from 'vuex';
import { isString } from '../../util';

export default {
    data() {
        return {
            dataFileTypes
        };
    },
    computed: {
        ...mapState({
            destSchemaList(state) {
                return state.dataset.form.structDataPreProcessing.destSchema;
            }
        }),
        limitedSaveTypes() {
            // 场景1.schema有多列或者schema种存在类型不为string的列，不能存为TEXT
            if (this.destSchemaList.length > 0 || this.destSchemaList.some(item => !isString(item.fieldType))) {
                return this.dataFileTypes.filter(item => item !== 'TEXT');
            } else {
                return this.dataFileTypes;
            }
        }
    }
};
