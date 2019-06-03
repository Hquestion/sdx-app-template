<template>
    <div
        :style="{height:height,width:width}"
    />
</template>

<script>
import echarts from 'echarts';
import { debounce } from '../../helper/common-fun';

export default {
    props: {
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '220px'
        },
        barData: {
            type: Array,
            default() {
                return [];
            }
        },
        barNameList: {
            type: Array,
            default() {
                return [];
            }
        },
        colorList: {
            type: Array,
            default() {
                return [];
            }
        },
        tipTitle: {
            type: String,
            default: ''
        },
        xname: {
            type: String,
            default: ''
        }
    },
    data() {
        return {
            chart: null
        };
    },
    mounted() {
        this.initChart();
        this.__resizeHanlder = debounce(() => {
            if (this.chart) {
                this.chart.resize();
            }
        }, 100);
        window.addEventListener('resize', this.__resizeHanlder);
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        window.removeEventListener('resize', this.__resizeHanlder);
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            this.chart && this.chart.clear();
            this.chart = echarts.init(this.$el, 'macarons');
            this.chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c}'
                },
                grid: {
                    left: '10px',
                    right: '10px',
                    bottom: '0px',
                    top: '10px',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'category',
                        data: this.barNameList,
                        axisLine: {
                            lineStyle: {
                                type: 'dotted',
                                color: '#DCDFE5'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            color: '#606266',
                            formatter(value) {
                                let ret = '';
                                if (value.length > 5) {
                                    ret = `${value.substring(0, 5)}...`;
                                } else {
                                    ret = value;
                                }
                                return ret;
                            }
                        }
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'dotted',
                                color: '#DCDFE5'
                            }
                        },
                        axisLabel: {
                            color: '#606266'
                        },
                        // name: `单位（${this.xname}）`,
                        splitLine: {
                            lineStyle: {
                                type: 'dotted',
                                color: '#DCDFE5'
                            }
                        }
                    }

                ],
                series: [
                    {
                        name: this.tipTitle,
                        type: 'bar',
                        barWidth: '10px',
                        data: this.barData,
                        itemStyle: {
                            barBorderRadius: [0, 10, 10, 0], // （顺时针左上，右上，右下，左下）
                            color: params => {
                                let colorList = this.colorList.slice(0, this.barData.length);
                                return colorList[colorList.length - params.dataIndex - 1];
                            }
                        }
                    }
                ]
            });
        }
    },

    watch: {
        barData(nval, oval) {
            this.barData = nval;
            if (JSON.stringify(nval) !== JSON.stringify(oval)) {
                this.initChart();
            }
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
