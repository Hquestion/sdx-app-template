<template>
    <div class="raintransit">
        <div>
            <el-row>
                <el-col :span="12">
                    <img
                        src="../../assets/images/dashboard/raintransit.png"
                    >
                </el-col>
                <el-col :span="12">
                    <div>
                        轨道交通模版
                    </div>
                    <div>
                        100+轨道交通模版
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RainTransit',
    data() {
        return {

        };
    },
    computed: {},
    methods: {

    }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.raintransit {
    background-image: url('../../assets/images/dashboard/raintransitBG.png');
    background-size: auto;
    background-position: center;
    background-repeat: no-repeat;
    height: 155px;
    .el-row {
        .el-col:first-child {
            text-align: center;
            img {
                width: 236px;
                padding-top: 16px;
            }
        }
        .el-col:last-child {
            height: 155px;
            padding: 52px 0;
            text-align: center;
            color: rgba(255,255,255,1);
            & div:first-child {
                font-weight: bold;
                line-height: 30px;
                font-size: 20px;
            }
            & div:last-child {
                font-weight: 400;
                color: rgba(255,255,255,1);
                line-height: 21px;
                font-size: 14px;
            }
        }
    }
}
</style>
