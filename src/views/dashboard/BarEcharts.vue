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
        tipTitle: {
            type: String,
            default: ''
        },
        xname: {
            type: String,
            default: ''
        },
        colorList: {
            type: Array,
            default() {
                return [];
            }
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
            localStorage.setItem('colorList', JSON.stringify(this.colorList));
            localStorage.setItem('dataLength', JSON.stringify(this.barData.length));
            this.chart.setOption({
                tooltip: {

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
                            color: '#606266'
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
                            color(params) {
                                let dataLength = JSON.parse(localStorage.getItem('dataLength'));
                                let colorList = JSON.parse(localStorage.getItem('colorList'));
                                colorList = colorList.slice(0, dataLength);
                                return colorList[colorList.length - params.dataIndex - 1];//
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
            this.initChart();
            this.__resizeHanlder = debounce(() => {
                if (this.chart) {
                    this.chart.resize();
                }
            }, 100);
            window.addEventListener('resize', this.__resizeHanlder);
        }
    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
