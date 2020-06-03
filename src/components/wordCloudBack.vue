<template>
    <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
</template>

<script>

export default {
  name: 'wordCloud',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      keyWords: {
        "visualMap": 22199,
        "continuous": 10288,
        "contoller": 620,
        "series": 274470,
        "gauge": 12311,
        "detail": 1206,
        "piecewise": 4885,
        "textStyle": 32294,
        "markPoint": 18574,
        "pie": 38929,
        "roseType": 969,
        "label": 37517,
        "emphasis": 12053,
        "yAxis": 57299,
        "name": 15418,
        "type": 22905,
        "gridIndex": 5146,
        "normal": 49487,
        "itemStyle": 33837,
        "min": 4500,
        "silent": 5744,
        "animation": 4840,
        "offsetCenter": 232,
        "inverse": 3706,
        "borderColor": 4812,
        "markLine": 16578,
        "line": 76970,
        "radiusAxis": 6704,
        "radar": 15964,
        "data": 60679,
        "dataZoom": 24347,
        "tooltip": 43420,
        "toolbox": 25222,
        "geo": 16904,
        "parallelAxis": 4029,
        "parallel": 5319,
        "max": 3393,
        "bar": 43066,
        "heatmap": 3110,
        "map": 20285,
        "animationDuration": 3425,
        "animationDelay": 2431,
        "splitNumber": 5175,
        "axisLine": 12738,
        "lineStyle": 19601,
        "splitLine": 7133,
        "axisTick": 8831,
        "axisLabel": 17516,
        "pointer": 590,
        "color": 23426,
        "title": 38497,
        "formatter": 15214,
        "slider": 7236,
        "legend": 66514,
        "grid": 28516,
        "smooth": 1295,
        "smoothMonotone": 696,
        "sampling": 757,
        "feature": 12815,
        "saveAsImage": 2616,
        "polar": 6279,
        "calculable": 879,
        "backgroundColor": 9419,
        "excludeComponents": 130,
        "show": 20620,
        "text": 2592,
        "icon": 2782,
        "dimension": 478,
        "inRange": 1060,
        "animationEasing": 2983,
        "animationDurationUpdate": 2259,
        "animationDelayUpdate": 2236,
        "animationEasingUpdate": 2213,
        "xAxis": 89459,
        "angleAxis": 5469,
        "showTitle": 484,
        "dataView": 2754,
        "restore": 932,
        "timeline": 10104,
        "range": 477,
        "value": 5732,
        "precision": 878,
        "target": 1433,
        "zlevel": 5361,
        "symbol": 8718,
        "interval": 7964,
        "symbolSize": 5300,
        "showSymbol": 1247,
        "inside": 8913,
        "xAxisIndex": 3843,
        "orient": 4205,
        "boundaryGap": 5073,
        "nameGap": 4896,
        "zoomLock": 571,
        "hoverAnimation": 2307,
        "legendHoverLink": 3553,
        "stack": 2907,
        "throttle": 466,
        "connectNulls": 897,
        "clipOverflow": 826,
        "startValue": 551,
        "minInterval": 3292,
        "opacity": 3097,
        "splitArea": 4775,
        "filterMode": 635,
        "end": 409,
        "left": 6475,
        "funnel": 2238,
        "lines": 6403,
        "baseline": 431,
        "align": 2608,
        "coord": 897,
        "nameTextStyle": 7477,
        "width": 4338,
        "shadowBlur": 4493,
        "effect": 929,
        "period": 225,
        "areaColor": 631,
        "borderWidth": 3654,
        "nameLocation": 4418,
        "position": 11723,
        "containLabel": 1701,
        "scatter": 10718,
        "areaStyle": 5310,
        "scale": 3859,
        "pieces": 414,
        "categories": 1000,
        "selectedMode": 3825,
        "itemSymbol": 273,
        "effectScatter": 7147,
        "fontStyle": 3376,
        "fontSize": 3386,
        "margin": 1034,
        "iconStyle": 2257,
        "link": 1366,
        "axisPointer": 5245,
        "showDelay": 896,
        "graph": 22194,
        "subtext": 1442,
        "selected": 2881,
        "barCategoryGap": 827,
        "barGap": 1094,
        "barWidth": 1521,
        "coordinateSystem": 3622,
        "barBorderRadius": 284,
        "z": 4014,
        "polarIndex": 1456,
      },
      data: []
    }
  },
  mounted(){
    this.drawLine();
  },
  methods: {

    


    drawLine(){
        // 把keywords中的数据存储进入data数组
        for (var name in this.keywords) {
            this.data.push({
                name: name,
                value: Math.sqrt(this.keywords[name])
            })
        }
        
        var maskImage = new Image();
        maskImage.src = '/asset/logo.png';
        var option = {
            title: {
                text: '搜索指数',
                x: 'center',
                textStyle: {
                    fontSize: 23
                }

            },
            backgroundColor: '#F7F7F7',
            series: [{
                    type: 'wordCloud',

                    // The shape of the "cloud" to draw. Can be any polar equation represented as a
                    // callback function, or a keyword present. Available presents are circle (default),
                    // cardioid (apple or heart shape curve, the most known polar equation), diamond (
                    // alias of square), triangle-forward, triangle, (alias of triangle-upright, pentagon, and star.

                    shape: 'circle',

                    // A silhouette image which the white area will be excluded from drawing texts.
                    // The shape option will continue to apply as the shape of the cloud to grow.

                    maskImage: maskImage,

                    // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
                    // Default to be put in the center and has 75% x 80% size.

                    left: 'center',
                    top: 'center',
                    width: '70%',
                    height: '80%',
                    right: null,
                    bottom: null,

                    // Text size range which the value in data will be mapped to.
                    // Default to have minimum 12px and maximum 60px size.

                    sizeRange: [12, 60],

                    // Text rotation range and step in degree. Text will be rotated randomly in range [-90, 90] by rotationStep 45

                    rotationRange: [-90, 90],
                    rotationStep: 45,

                    // size of the grid in pixels for marking the availability of the canvas
                    // the larger the grid size, the bigger the gap between words.

                    gridSize: 8,

                    // set to true to allow word being draw partly outside of the canvas.
                    // Allow word bigger than the size of the canvas to be drawn
                    drawOutOfBound: false,

                    // Global text style
                    textStyle: {
                        normal: {
                            fontFamily: 'sans-serif',
                            fontWeight: 'bold',
                            // Color can be a callback function or a color string
                            color: function () {
                                // Random color
                                return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                            }
                        },
                        emphasis: {
                            shadowBlur: 10,
                            shadowColor: '#333'
                        }
                    },

                    // Data is an array. Each array item must have name and value property.
                    data: [{
                        name: 'Farrah Abraham',
                        value: 366,
                        // Style of single text
                        textStyle: {
                            normal: {},
                            emphasis: {}
                        }
                    }]
                }]
                    };
                    // 基于准备好的dom，初始化echarts实例
                    let myChart = this.$echarts.init(document.getElementById('myChart'))
                    // 绘制图表
                    myChart.setOption(option);
                }
            }
        }

        

</script>

<style scoped>
#slotPanel{
   
}
</style>