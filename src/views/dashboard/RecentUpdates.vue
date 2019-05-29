<template>
    <div class="recent-updates">
        <sdxu-content-panel
            :title="title"
        >
            <more-btn
                class="morebtn"
                @getMore="getTaskMore"
            />
            <div class="content">
                <div
                    class="item"
                    v-for="(item, index) in nameTimes.slice(0, 5)"
                    :key="index"
                >
                    <span>{{ item.name }}</span>
                    <span>{{ getDateDiff(item.time) }}</span>
                </div>
            </div>
        </sdxu-content-panel>
    </div>
</template>

<script>
import MoreBtn from './MoreBtn';

export default {
    name: 'RecentUpdates',
    data() {
        return {

        };
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        nameTimes: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MoreBtn
    },
    computed: {

    },

    methods: {
        getTaskMore() {
            console.log('more');
        },
        getDateDiff(dateTimeStamp) {
            let minute = 1000 * 60;
            let hour = minute * 60;
            let day = hour * 24;
            let month = day * 30;
            let now = new Date().getTime();
            let diffValue = now - new Date(dateTimeStamp);
            if (diffValue < 0) { return; }
            let monthC = diffValue / month;
            let weekC = diffValue / (7 * day);
            let dayC = diffValue / day;
            let hourC = diffValue / hour;
            let minC = diffValue / minute;
            let result = '';
            if (monthC >= 1) {
                result = '' + parseInt(monthC) + '月前';
            } else if (weekC >= 1) {
                result = '' + parseInt(weekC) + '周前';
            } else if (dayC >= 1) {
                result = '' + parseInt(dayC) + '天前';
            } else if (hourC >= 1) {
                result = '' + parseInt(hourC) + '小时前';
            } else if (minC >= 1) {
                result = '' + parseInt(minC) + '分钟前';
            } else { result = '刚刚'; }
            return result;
        }
    },
    watch: {

    }
};
</script>
<style lang="scss" scoped>
.recent-updates {
    & /deep/ {
        .sdxu-content-panel__main {
            margin-top: 0 ;
        }
        .sdxu-content-panel {
            padding: 20px;
            height: 236px;
            margin-bottom: 20px;
            position: relative;
        }
        .morebtn {
            position: absolute;
            top: 10px;
            right: 20px;
        }
        .content {
            .item {
                height: 40px;
                height: 36px;
                display: flex;
                justify-content: space-between;
                span:first-child{
                    font-size:14px;
                    color:rgba(96,98,102,1);
                    font-family:SourceHanSansCN-Normal;
                }
                span:last-child{
                    font-size:12px;
                    color:#909399;
                }
            }
        }
    }
}
</style>

