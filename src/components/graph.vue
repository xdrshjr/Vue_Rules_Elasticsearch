<template>
  <div id="myChart" :style="{width: '100%', height: '500px'}">
    
  </div>
</template>

<script>
import exampleData from "../data/example";
import axios from 'axios'

export default {
  name: "graph",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      // 这是图查询匹配到的ES文本内容
      ruleContentDataFromCloud: "这是一个测试",
      searchContext: "地铁车站",
      exampleDataField: [],
      myChart: null,
      dataOutSide: [],
      contentList: [],
      dataOutSide_relationship: [],
      filterdataOutSide_relationship: [],
      searchIndex: "28.7.1",
      // 从本地json导入的数据
      dataFromExample: [],
      option: {
        backgroundColor: "white",

        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        color: ["#83e0ff", "#45f5ce", "#b158ff"],
        coordinateSystem: "cartesian2d",
        series: [
          {
            type: "graph",
            layout: "force",
            force: {
              repulsion: 1000,
              edgeLength: 100
            },
            roam: true,
            label: {
              normal: {
                show: true
              }
            },
            //设置连线形式为箭头
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            // data: this.dataOutSide,
            data: [
              {
                name: "地铁",
                IDD: "1",
                id: 0,
                symbolSize: 80,
                draggable: true,
                category: 0,
                itemStyle: {
                  normal: {
                    borderColor: "#04f2a7",
                    borderWidth: 6,
                    shadowBlur: 20,
                    shadowColor: "#04f2a7",
                    color: "#001c43"
                  }
                }
              },
              {
                name: "车站",
                IDD: "63",
                id: 56,
                symbolSize: 80,
                itemStyle: {
                  normal: {
                    borderColor: "#04f2a7",
                    borderWidth: 4,
                    shadowBlur: 10,
                    shadowColor: "#04f2a7",
                    color: "#001c43"
                  }
                },
                category: 1
              }
            ],

            links: [
              {
                source: "0",
                target: "56"
                // value: '示例'
              },
              {
                source: "56",
                target: "0"
                // value: '示例'
              }
            ],
            lineStyle: {
              normal: {
                color: "#000",
                opacity: 0.5,
                width: 5,
                curveness: 0.3,
                type: "solid"
              }
            },
            categories: [{ name: "0" }, { name: "1" }, { name: "2" }],
            //指定连线方式
            edges: this.links
          }
        ]
      }
    };
  },
  watch: {
    option: {
      handler(newVal, oldVal) {
        console.log("监听到变化!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(newVal);
        console.log(oldVal);
      }
    },
    deep: true
  },
  mounted() {
    this.drawLine();
    // setTimeout(() => {
    //   this.getDataFromNative();
    // }, 300);
  },
  //   组件创建之后调用的方法
  created() {
    // 测试 创建本组件实例的时候 对外界json数据进行导入
    // this.getDataFromNative()
    // this.drawLine();
            
    // 使用该组件，就会调用created方法 在created这个方法中可以操作后端的数据，数据响应视图
    // 应用： 发起ajax请求
    console.log("启动生命周期");
    this.searchContext = localStorage.getItem("searchContext")
    this.searchIndex = localStorage.getItem("searchContentID")
    var searchContext = this.searchContext
    console.log("当前搜索关键词:")
    console.log(searchContext)
    // this.searchContext = searchContext;
    //调用post方法获取返回的数据 暂时注释掉 请求URL知道以后修改内部方法
    // this.getPostData(this.searchContext);
    console.log(exampleData)

            
    // 组件创建之后 改变vuex中的flag
    this.flag = true
    // 测试 创建本组件实例的时候 对外界json数据进行导入
    this.getGetData(this.searchIndex)
    setTimeout(() => {
      this.getDataFromNative(this.exampleDataField);
    }, 300);
    // 发送请求 更新本地数据exampleDataField
    
    // 使用请求 获取服务器端来的数据
    // this.getDataFromNative(this.exampleDataField)
    

  },
  update() {
    // 测试 创建本组件实例的时候 对外界json数据进行导入
    // this.getDataFromNative();
    // this.drawLine();
  },
  methods: {



    // 20191101获取数据请求的方法
    getGetData(searchContext){
        axios.get('http://39.96.20.91:8080/subwaycode/content', {
            params : { //请求参数
                content : searchContext
            }
        }).then((response)=>{
            if(response.data[0].neo4jResult != ""){
              console.log(response.data);//请求正确时执行的代码
              this.exampleDataField = response.data
              this.ruleContentDataFromCloud = response.data[0].esResult.code_content
            }else{
              console.log("未找到相关图谱")
              alert("未搜索到相关图谱")
            }
        }).catch(function(response){
            console.log(response);//发生错误时执行的代码
        })
    },

    // 测试 从本地json文件中获取所有数据 并解析
    getDataFromNative: function(exampleData) {
      this.dataFromExample = exampleData;
      //console.log(this.dataFromExample)
      let numOfData = this.dataFromExample.length;
      // console.log("数据总数:" + numOfData)
      // 遍历数据数组  获取每一个数据 并存储
      // let j = 0
      for (var i = 0; i < numOfData; i++) {
        var tempData = this.dataFromExample[i];
        // console.log(tempData)
        // 如果有相应的图数据库数据 就进行存储
        // 根据传入的规范标号 查询相应的图谱数据是否存在
        // 对应规范条目的图数据存在 且 标号符合查询要求
        var tempIndexData = tempData.esResult.code_content;
        // console.log(tempIndexData)
        if (
            // tempData.neo4jResult != ""
            // 这里暂时先规定有图就显示 后期根据编号判断是否显示图
          tempData.neo4jResult != "" && this.indexCorrect(tempIndexData, this.searchIndex)
        ) {
          console.log("匹配到图数据库中的图数据存在")
          this.contentList = tempData.neo4jResult;
          // console.log(this.contentList[j])
          // this.j+=1
          // console.log("当前搜索关键词的相关关系" + i)
          // console.log(this.contentList[j])
        }
      }
      console.log("当前查询编号的图数据为:");
      console.log(this.contentList);
      // this.option.series[0].data = []
      // console.log(this.option.series[0].data)

      //对图数据中的数据进行注入
      for (var k = 0; k < this.contentList.length; k++) {
        console.log("遍历到的图关系的两端实体:");
        console.log(this.contentList[k].singleNeo4jResult[0]);
        console.log(this.contentList[k].singleNeo4jResult[2]);
        // 对结点数据进行处理
        var tempdata = this.dealNodeData(
          this.contentList[k].singleNeo4jResult[0]
        );
        var tempdata2 = this.dealNodeData(
          this.contentList[k].singleNeo4jResult[2]
        );
        console.log(tempdata);
        // console.log(tempdata2)
        // this.option.series[0].data.push(tempdata)
        // this.option.series[0].data.push(tempdata2)
        //如果数组中不存在已经有的结点 就加入
        this.dataOutSide.push(tempdata);
        this.dataOutSide.push(tempdata2);
      }
      // 进行10次去重 去重算法有bug
      var filterdataOutSide = [];
      for (var a = 0; a < 10; a++) {
        filterdataOutSide = this.unique1(this.dataOutSide);
      }

      // console.log(filterdataOutSide)
      // console.log(this.option.series[0].data)
      //取出默认的图展示数据!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      console.log(filterdataOutSide);
      this.option.series[0].data = filterdataOutSide;
      // console.log(this.option.series[0].data)
      //对图展示数据进行赋值
      // this.option.series[0].links = []
      // console.log(this.option.series[0])

      console.log(this.contentList);
      //对图数据中的关系数据进行注入
      for (var q = 0; q < this.contentList.length; q++) {
        console.log("遍历到的图关系:");
        console.log(this.contentList[q].singleNeo4jResult[1]);
        this.dataOutSide_relationship.push(
          this.contentList[q].singleNeo4jResult[1]
        );
      }
      var temp = this.dealEdge(this.dataOutSide_relationship);
      this.option.series[0].links = temp;
      console.log(this.option.series[0]);
      this.myChart.setOption(this.option);
    },
    // 数组去重
    unique1: function(arr) {
      for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
          if (arr[i].IDD === arr[j].IDD) {
            arr.splice(j, 1); //去除重复的对象；
          } else {
            j++;
          }
        }
      }
      return arr;
    },
    // 根据IDD来查询结点数据里的name 并返回name
    searchNameById: function(nodeData, id) {
      console.log("调用了通过结点ID查询name的方法");
      console.log(nodeData);
      console.log(id);
      var temp = "";
      for (var i = 0; i < nodeData.length; i++) {
        // console.log("当前结点id:")
        // console.log(nodeData[i].id)
        // console.log("当前查询id:")
        // console.log(id)
        if (nodeData[i].id == id) {
          console.log("查询到相等的ID");
          temp = nodeData[i].name;
        }
      }
      console.log("根据ID查询到的name为:");
      console.log(temp);
      return temp;
    },
    // 对查询到的数据的边进行标准化处理 以符合echarts的要求
    dealEdge: function(data) {
      console.log("对边数据进行标准化处理");
      console.log(data);
      // console.log(this.contentList)
      for (var i = 0; i < data.length; i++) {
        console.log(data);
        // data[i]["source"] = this.searchNameById(this.option.series[0].data,data[i].startId)
        // data[i]["target"] = this.searchNameById(this.option.series[0].data,data[i].endId)
        try {
            data[i]["source"] = data[i].startId.toString();
            data[i]["target"] = data[i].endId.toString();
            data[i]["value"] = data[i].type;
        } catch (error) {
            console.log("关系字符串转换错误")
        }

        delete data[i]["type"];
        delete data[i]["startId"];
        delete data[i]["id"];
        delete data[i]["endId"];
        delete data[i]["IDD"];
      }
      return data;
    },
    // 对查询到的数据的结点进行标准化处理 以符合echarts的要求
    dealNodeData: function(data) {
      console.log("对结点进行数据标准化处理");
      data["symbolSize"] = 80;
      data["itemStyle"] = {
        normal: {
          borderColor: "#04f2a7",
          borderWidth: 4,
          shadowBlur: 10,
          shadowColor: "#04f2a7",
          color: "#001c43"
        }
      };
      data["category"] = 1;
      data["draggable"] = true;
      console.log(data);
      return data;
    },

    // 搜索内容和规范标号的匹配 匹配成功的图数据进行返回 并显示
    // 参数1：输入的字符串 出入进去后进行正则匹配获取标号
    // 参数2：搜索的标号
    indexCorrect: function(tempData, searchIndex) {
      //使用字符串截取
      var patt1 = /[\u4e00-\u9fa5]/g;
      var String = tempData.substring(0, 10);
      var result = String.replace(patt1, "").trim();
      // console.log("查询到的ES结果的所有编号为:")
      // console.log(result)
      if (result == searchIndex) {
        console.log("匹配到一条:");
        console.log(searchIndex);
        return true;
      } else {
        // console.log("没有匹配到图数据")
        return false;
      }
    },

    drawLine() {
      console.log("绘制图形");
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption(this.option);
    }
  }
};
</script>

<style scoped>
#slotPanel {
}
</style>