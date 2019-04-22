<template>
    <div style="max-height: 800px; overflow: auto">
        <div
            class="loading-div"
            v-if="!showContent"
        >
            <loading />
        </div>
        <el-tree
            v-else
            :data="fileData"
            :props="props"
            :default-expanded-keys="[]"
            ref="tree"
            expand-on-click-node
        />
    </div>
</template>

<style scoped>
.buttons {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
}
.loading-div {
    width: 100%;
    height: 100px;
}
</style>

<script>
import loading from 'components/animation/loading';

export default {
    components: { loading },
    props: {
        fileData: {
            type: Array,
            default() {
                return [];
            }
        },
        showContent: {
            type: Boolean,
            default: true
        }
    },

    data() {
        return {
            props: {
                label: 'name',
                children: 'children'
            }
        };
    },
    methods: {
        getPath(pathStr) {
            let path = [];
            if (pathStr !== undefined && pathStr !== '') {
                let temp = pathStr.split('/');
                for (let i = 0; i < temp.length; i++) {
                    path.push(temp[i]);
                }
            }
            return path;
        }
    }
};
</script>
