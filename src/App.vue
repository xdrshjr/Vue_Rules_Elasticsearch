<template>
  <div id="app">
    <!-- 导航栏 -->
    <Navigator></Navigator>
    <!-- 下方选择条 -->
    <div id='chooseTab'>
          <!-- 使用传递对象的方式来加载组件 进行路由跳转 可以传递参数 -->
          <!-- 对路由路径进行用户名的拼接 -->
          <!-- 采用v-bind -->
          <div>
            <b-card no-body>
              <b-tabs pills card>
                <b-tab title="规范查询内容_ES" active @click="changeRouter00">
                  <div style="margin-right:0px;font-size:10px;color:black">当前查询到的规范条目数为:100条 默认搜索内容:地铁车站</div>
                </b-tab>
                <!-- <b-tab title="规范查询内容_JAVA" @click="changeRouter01">
                  <div style="margin-right:0px;font-size:10px;color:black">当前查询到的规范条目数为:100条 默认搜索内容:地铁车站</div>
                </b-tab> -->
                <b-tab title="图谱展示" @click="changeRouter03">
                  <div style="margin-right:0px;font-size:10px;color:black">请输入你要搜索的图谱关键词和编号</div>
                  <div style="margin-right:0px;font-size:10px;color:black">默认：地铁车站 28.7.1</div>
                  <div style="margin-right:0px;font-size:10px;color:black">例子：地铁工程 1.0.12</div>
                  <div style="margin-top: 10px">
                    <b-form class="searchContextInGraph" @submit="doSubmit" inline>
                      <label class="sr-only" for="inline-form-input-name">KeyWord</label>
                      <!-- <b-input-group prepend="关键词" class="mb-1 mr-sm-1 mb-sm-0">
                        <b-input
                          id="inline-form-input-name"
                          class="mb-2 mr-sm-2 mb-sm-0"
                          placeholder="地铁车站"
                          v-model="searchKeyWord"
                        ></b-input>
                        </b-input-group> -->
                      <label class="sr-only" for="inline-form-input-username">ruleId</label>
                      <b-input-group prepend="编号" class="mb-1 mr-sm-1 mb-sm-0">
                        <b-input v-model="searchContentID" id="inline-form-input-username" placeholder="28.7.1"></b-input>
                      </b-input-group>

                      <b-form-checkbox class="mb-2 mr-sm-2 mb-sm-0">记住我</b-form-checkbox>

                      <b-button variant="primary" @click="doSubmit">搜索
                        <b-spinner small type="grow"></b-spinner>
                          Loading...
                      </b-button>
                    </b-form>
                  </div>
                </b-tab>
                <b-tab title="搜索词云" @click="changeRouter04">
                  <div style="margin-right:0px;font-size:10px;color:black">这是根据您的搜索展示的搜索词云</div>
                </b-tab>
                <b-tab title="领域NER命名实体识别" @click="changeRouter05">
                  <div style="margin-right:0px;font-size:10px;color:black">备用</div>
                </b-tab>
                <b-tab title="常规NER命名实体识别" @click="changeRouter07">
                  <div style="margin-right:0px;font-size:10px;color:black">备用</div>
                </b-tab>
                <b-tab title="NLP数据标记工具" @click="changeRouter08">
                  <div style="margin-right:0px;font-size:10px;color:black">NLP数据标记工具</div>
                </b-tab>
                <b-tab title="详细信息" @click="changeRouter02">
                  <div style="margin-right:0px;font-size:10px;color:black">规范具体内容展示</div>
                </b-tab>
                

              </b-tabs>
            </b-card>
          </div>
    </div>
    <!-- 下方显示面板 -->
    <b-container class="bv-example-row" style="margin-top: 10px;margin-left:0px">
      <b-row>
        <b-col cols="4">
          <b-list-group style="width:60%;margin-top:10px">
            <!-- 可添加 active -->
            <b-list-group-item ref="allRules" href="#some-link" @click="changeRouter06">所有规范(测试)</b-list-group-item>
            <b-list-group-item href="#"  @click="changeRouter00">轨道交通规范</b-list-group-item>
            <b-list-group-item href="#" disabled @click="errorClick">备用</b-list-group-item>
            <b-list-group-item href="#foobar" disabled @click="errorClick">备用</b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col cols="8">
          
          <router-view v-if="isRouterAlive">
            <ContentList slot="contentList"></ContentList>
            <!-- <PaginationNavigation slot="numberOfPage"></PaginationNavigation> -->
          </router-view>
          
        </b-col>
       
      </b-row>
      
    </b-container>
    

    
  </div>
</template>

<script>
import Navigator from './components/navigator.vue'
import ContentList from './components/ContentList.vue'
import Vue from 'vue'


export default {
  name: 'app',
  data() {
    
    return {
      // 用来控制刷新组件的标记
      isRouterAlive: true,
      eventHub: new Vue(),
      user001: "jiaorui",
      // 搜索条目标号
      searchContentID: "1.0.12",
      // 搜索关键词
      searchKeyWord: "地铁车站"
    }
   
  },
  components: {
    Navigator,
    ContentList
  },
  methods: {
    errorClick(){
      alert("功能尚未开放")
    },
    // 刷新组件的方法
    reload () {
     this.isRouterAlive = false
     this.$nextTick(() => (this.isRouterAlive = true))
    },
    doSubmit: function() {
      // 刷新组件
      this.reload()
      console.log("点击了搜索按钮")
      console.log(this.searchContentID)
      console.log(this.searchKeyWord)
      // 给全局搜索变量设置搜索关键词和ID
      localStorage.setItem("searchContext",this.searchKeyWord)
      localStorage.setItem("searchContentID",this.searchContentID)

    },
    // 默认ES查询接口
    changeRouter00() {
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/contentList_ES')
    },
    // JAVA查询接口查询规范
    changeRouter01() {
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/home')
      
      
    },
    changeRouter02() {
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/about')
      
    },
    changeRouter03() {
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/graph')
      
    },
    changeRouter04() {
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/wordCloud')
      
    },
    changeRouter05(){
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/vueNeo4j')
      
    },
    changeRouter06(){
      // var allRuleElement = this.$refs.allRules.active
      // allRuleElement = false
      // this.$nextTick(function() {
      //     this.$refs.allRules.focus();
      // })
      // console.log(allRuleElement)
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/allContentList')
    },
    // 切换到常规ner查询
    changeRouter07(){
      // var allRuleElement = this.$refs.allRules.active
      // allRuleElement = false
      // this.$nextTick(function() {
      //     this.$refs.allRules.focus();
      // })
      // console.log(allRuleElement)
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/vueNeo4j_ner_normal')
    },
        // 切换到tag标记页面
    changeRouter08(){
      // var allRuleElement = this.$refs.allRules.active
      // allRuleElement = false
      // this.$nextTick(function() {
      //     this.$refs.allRules.focus();
      // })
      // console.log(allRuleElement)
      this.reload()
      //console.log('手动修改了路由')
      this.$router.push('/tagPage')
    }
    
  }
}
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 0px;
  }
  .active {
    color: blueviolet
  }
  #chooseTab {
    
    
  }
  #leftPanel {
    width: 300px
  }
</style>
