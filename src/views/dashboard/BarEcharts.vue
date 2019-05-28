<template>
    <div
        :style="{height:height,width:width}"
    />
</template>

<script>
import echarts from 'echarts';
import { debounce } from '../../helper/common-fun';

// require('echarts/theme/macarons'); // echarts theme

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
        pieData: {
            type: Object,
            default() {
                return {};
            }
        },
        colorList: {
            type: Array,
            default() {
                return ['#5C89FF', 'rgba(92,137,255,0.9)', 'rgba(92,137,255,0.8)', 'rgba(92,137,255,0.7)', 'rgba(92,137,255,0.6)', 'rgba(92,137,255,0.5)', 'rgba(92,137,255,0.4)', 'rgba(92,137,255,0.3)', 'rgba(92,137,255,0.2)', 'rgba(92,137,255,0.1)'];
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
            this.chart.setOption({
                tooltip: {

                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'category',
                        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
                        name: '直接访问',
                        type: 'bar',
                        barWidth: '10px',
                        data: [10, 52, 200, 334, 390, 330, 220],
                        itemStyle: {
                            barBorderRadius: [0, 10, 10, 0], // （顺时针左上，右上，右下，左下）
                            color(params) {
                                let colorList = JSON.parse(localStorage.getItem('colorList'));
                                return colorList[params.dataIndex];
                            }
                        }
                    }
                ]
            });
        }
    },

    watch: {

    }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>

</style>
