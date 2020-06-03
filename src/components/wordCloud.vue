<template>
<div class="container">
  <div id="myChart" :style="{width: '100%', height: '600px'}"></div>
</div>
</template>
<script>
export default {
  name: 'wordCloud',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      isRouterAlive: true
      
    }
  },
  mounted () {
    this.drawLine()
  },
  created: function() {
    this.reload()
  },
  methods: {
    // 刷新组件的方法
    reload () {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
    },
    createRandomItemStyle () {
      return {
        normal: {
          color: 'rgb(' + [
            Math.round(Math.random() * 500),
            Math.round(Math.random() * 500),
            Math.round(Math.random() * 500)
          ].join(',') + ')'
        }
      }
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      // 绘制图表
      let option = {
        title: {
          text: '搜索词频云图',
          link: 'http://www.google.com/trends/hottrends'
        },
        tooltip: {
          show: true
        },
        series: [{
          name: '搜索词频云图',
          type: 'wordCloud',
          size: ['80%', '80%'],
          textRotation: [0, 45, 90, -45],
          textPadding: 0,
          autoSize: {
            enable: true,
            minSize: 25
          },
          data: [
            {
              name: '地铁',
              value: 10000,
              itemStyle: {
                normal: {
                  color: 'black'
                }
              }
            },
            {
              name: '铁路',
              value: 6181,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '列车',
              value: 4386,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '钢筋',
              value: 4055,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '站台层',
              value: 2467,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '站厅层',
              value: 2244,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '列车',
              value: 1898,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '列车轨迹',
              value: 1484,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '车站',
              value: 1112,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '防火',
              value: 965,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '安全措施',
              value: 847,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '施工进度',
              value: 582,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '施工工艺',
              value: 555,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '难度',
              value: 550,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '岛式车站',
              value: 462,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '列车线路',
              value: 366,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '这是一个测试',
              value: 360,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '你好',
              value: 282,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '入场线',
              value: 273,
              itemStyle: this.createRandomItemStyle()
            },
            {
              name: '菜单',
              value: 265,
              itemStyle: this.createRandomItemStyle()
            }
          ]
        }]
      }
 
      // 为echarts对象加载数据
      myChart.setOption(option)
    }
  }
}
</script>
<style>
 
</style>