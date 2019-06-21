<template>
    <ul
        class="contextMenu"
        :style="position"
    >
        <li
            v-for="item in menuList"
            :key="item.name"
            @click="menuClicked(item)"
            :class="item.disabled ? &quot;disabled&quot; : &quot;&quot;"
        >
            <i
                class="iconfont"
                :class="item.icon"
            />
            <span>{{ item.label }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'ContextMenu',
    props: {
        menuList: {
            type: Array,
            default: () => []
        },
        contextX: {
            type: Number,
            default: 0
        },
        contextY: {
            type: Number,
            default: 0
        },
        owner: {},
        executeId: {
            type: String,
            default: ''
        }
    },
    computed: {
        position() {
            return {
                top: this.contextY + 'px',
                left: this.contextX + 'px'
            };
        }
    },
    methods: {
        menuClicked(item) {
            if (!item.disabled) {
                if (item.cb) {
                    item.cb(this.owner);
                } else {
                    this.$emit('clickmenu', item.name, this.owner);
                }
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.contextMenu {
    margin: 0;
    padding: 0;
    position: absolute;
    z-index:9;
    width: 174px;
    background: rgba(253, 253, 253, 1);
    box-shadow: 0px 2px 7px 0px rgba(63, 89, 115, 0.4);
    & > li {
        list-style: none;
        width: 174px;
        height: 30px;
        border-top: 2px #ced6de solid;
        color: rgba(206, 214, 222, 1);
        line-height: 24px;
        &:first-child {
            border-top: none;
        }
        &:hover {
            background-color: rgb(237, 239, 244);
            color: #459cdf;
            >span{
                color: #459cdf;
            }
        }
        & > i {
            font-size: 12px;
            margin-left: 16px;
            margin-right: 6px;
        }
        & > span {
            width: 118px;
            height: 18px;
            font-size: 12px;
            font-family: siyuan-rg;
            color: rgba(45, 69, 93, 1);
            line-height: 17px;
        }
    }
    & > .disabled {
        cursor: not-allowed;
        color: #a3b1bf;
        &:hover {
            color: #a3b1bf;
        }
        &>span{
            color:#a3b1bf !important;
        }
    }
}
</style>
