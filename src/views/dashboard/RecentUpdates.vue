<template>
    <div class="recent-updates">
        <sdxu-content-panel
            :title="title"
            size="small"
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
                    <span :title="item.name">{{ item.name }}</span>
                    <span>{{ getDateDiff(item.time) }}</span>
                </div>
            </div>
        </sdxu-content-panel>
    </div>
</template>

<script>
import MoreBtn from './MoreBtn';
import { getDateDiff } from '@sdx/utils/lib/helper/transform';
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
        // 注册
        getDateDiff
    },
    watch: {

    }
};
</script>
<style lang="scss" scoped>
.recent-updates {
    & /deep/ {
        .sdxu-content-panel__main {
            margin-top: 0;
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
            right: -2px;
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
                    max-width: 78%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    cursor: pointer;
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

