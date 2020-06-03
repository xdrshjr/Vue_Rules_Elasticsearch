<template>
    
    <b-list-group>
        <!-- <button v-bind="testData()">发送数据请求</button> -->
        <h1 v-if="flag">网络好像有点问题...</h1>
        <!-- <button @click="refreshComponent">组件重新刷新</button> -->
        <b-card
            title="规范内容"
            img-src="http://132.232.247.209:8080/railWay.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 200rem;max-height: 80rem;"
            class="mb-2"
        >


            
        </b-card>
        <b-list-group-item id="contentCard" href="#" class="flex-column align-items-start bounceIn"  v-for="(item , index) in showListInstance" :key="index">
            
            <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">序号: {{index + 1}}</h5>
            <h5 :key="item.code_name" style="margin-left: 0px"></h5>
            <small>XAUT</small>
            </div>

            <p v-html = "item">
            <!-- {{ item.code_content }} -->
            </p>

            <small>This is an example.</small>
        </b-list-group-item>

        <!--分页-->
        <div class="footer" style="margin-top:20px">
            
            <template>
                <Page :total="this.contentList.length"  @on-change="onChange"/>
            </template>
        </div>

        <!-- 子组件进行注册 监听子组件发生的改变--方法有问题--待解决 -->
        <!-- <Navigator v-show="false" @changedContent="getChildData"></Navigator> -->

    </b-list-group>


</template>

<script>
import axios from 'axios'
import EventBus from '../commonjs/eventBus'
import exampleData from '../data/example'

export default {
    name: 'ContentList',
    // 将导航栏添加为子组件 以供子组件调用父组件方法
    components: {

    },
    data () {
        return {
            // 从本地json导入的数据
            exampleDataField : [],
            dataFromExample : [],
            isRouterAlive: true,
            flag: true,
            searchContext: "地铁车站",
            searchContentID: "28.7.1",
            numsOfSearch : 0,
            pageCount: 0,
            pageAllCount: 10,
            contentList: [
                {code_name: "规范标题正在检索中...",code_content : "规范内容正在检索中..."},
                {code_name: "规范标题正在检索中...",code_content : "规范内容正在检索中..."},
                {code_name: "规范标题正在检索中...",code_content : "规范内容正在检索中..."}
                
            ],
            //总的数据数组
            showList: [],
            //单页显示的十个数据的数组
            showListInstance: [],
            list: [

            ],
            contentTitle:"轨道交通规范示例1",
            content:"一、工法特点本工法注重施工顺序的合理化安排，注重场地的合理化分配，注重了施工规范的严格执行和施工流程的控制，注重了协调沟通的重要性，注重了抢工的科学性。通过对施工工序的合理化安排、施工场地的规范化管理达到缩短工期，提高施工质量的目的。解决了在狭小空间、狭小场地下，材料的运输问题和多专业、多家施工单位的施工协调配合问题。二、适用范围本工法适用于城市地铁机电设备安装工程，尤其是闹市区的地下站机电设备安装。同时可适用于大型公共场所公用设备安装工程、高层建筑公用设备安装工程、厂房公用设备安装工程等工程的施工。三、工艺原理由于地铁机电设备安装工程的材料运输一般采用龙门吊或灵机桅杆从风亭口向站内运输材料，大中型设备采用轨道车从轨行区向站内运输。给排水及消防管道支架均采用热镀锌处理，配电柜、给水管道连接螺栓及区间固定支架的膨胀螺栓均采用不锈钢材质，以增加其耐腐蚀性，风管、管道、桥架、母线等过墙处均按要求加套管并用防火堵料封堵，以防不同防火分区窜烟。"
            
        }
    },

    
    created: function() {
        this.reload()
        // 使用该组件，就会调用created方法 在created这个方法中可以操作后端的数据，数据响应视图
        // 应用： 发起ajax请求
        console.log("启动生命周期");
        localStorage.setItem("searchContext",this.searchContext)
        localStorage.setItem("searchContentID",this.searchContentID)
        var searchContext = this.searchContext
        console.log("当前搜索关键词:")
        console.log(searchContext)
        this.searchContext = searchContext;
        //调用post方法获取返回的数据 暂时注释掉 请求URL知道以后修改内部方法
        // this.getPostData(this.searchContext);
        // 更改了请求的方法
        // this.getGetData(this.searchContext)

        
                
        // 组件创建之后 改变vuex中的flag
        this.flag = true
        // 测试 创建本组件实例的时候 对外界json数据进行导入
        this.getDataFromNative(exampleData)
        // console.log(exampleData)
        // 发送请求 更新本地数据
        this.getGetData(this.searchContext)

        setTimeout(() => {
            console.log("获取到的后台相应的s数据!!!!!")
            // console.log(this.exampleDataField)
            // 使用请求 获取服务器端来的数据
            this.getDataFromNative(this.exampleDataField)
        }, 300);
        // this.reload()
        
    },
    mounted(){
        EventBus.$on('changedContent',data => {
                this.reload()
                console.log("内容显示组件中监听到搜索内容发生改变:" + data)
                // 调用ES请求方法从ES中直接获取数据
                this.getPostData(data);
                this.searchContext = data
                // JAVA接口 本组件中放弃使用
                // this.getGetData(data)
                // this.reload()
                // this.flag = false
                // 使用请求 获取服务器端来的数据
                // setTimeout(() => {
                //     this.getDataFromNative(this.exampleDataField)
                //     console.log("数据改变后的showListInstance:")
                //     console.log(this.showListInstance)
                //     //更新全局变量 所有搜索结果进行联动
                //     localStorage.setItem("searchContext",data)
                //     this.searchContext = data
                //     // this.getGetData(data)
                // },300);
                

        })
    },
    methods: {
        // 刷新组件的方法
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        //点击了具体某一条规范的条目
        clickContent() {
            console.log("点击了具体规范条目")
        },
        // 请求获取数据测试
        testData(){
            console.log("点击了发送请求按钮")
            this.getGetData("地铁车站")
        },
        // 从本地josn数据中获取数据 并进行解析 测试!
        getDataFromNative: function(exampleData){
            this.dataFromExample = exampleData
            // console.log(this.dataFromExample)
            let numOfData = this.dataFromExample.length
            console.log("数据总数:" + numOfData)
            // 遍历数据数组  获取每一个数据 并存储
            for(var i  = 0;i<numOfData;i++){
                var tempData = this.dataFromExample[i]
                // console.log(tempData)
                this.contentList[i] = tempData.esResult.code_content
                //console.log(this.contentList[i])
            }
            let searchContext = this.searchContext
                        //对规范中的三个井号进行处理 替换为换行符
            this.splitContent();
            //对规范中的字符进行关键字正则匹配和标红
            this.regReplaceAndMarkToRed(searchContext);
            
            for(let i=0;i<30;i++){
                // console.log(this.contentList[i]);
                
            }
            
            //计算所有的分页数
            this.pageAllCount = parseInt(numOfData/10);
            //遍历循环contentList数组 将内容读取到showList中
            //分页 单页显示10个数组
            this.showList = []
            for(let i=0;i<this.contentList.length;i+=10){
                this.showList.push(this.contentList.slice(i,i+10));
            }
            // console.log(this.showList)
            for(let i=0;i<this.contentList.length;i++){
//						    	console.log(this.showList[i][0].code_content);
//						    	console.log(this.showList[i][1].code_content);
//						    	console.log(this.showList[i][2].code_content);
                
            }
            this.pageCount = this.pageCount
            this.showListInstance = this.showList[this.pageCount];
            console.log("显示当前页面的数据:")
            // console.log(this.showListInstance);
            this.flag = false;
            

        },
        refreshComponent() {
            this.getPostData("钢筋");
            this.reload()
        },
        fatherMethod(ab) {
            console.log('测试');
            console.log(ab)
            
        },

        //从本地的存储中获取到所有的评论 并修改数据
        getCommentList(){
            var CommentList = JSON.parse(localStorage.getItem('cmts') || '[]');
            this.list = CommentList;
            
        },
        //发送post 请求
        postTest01(){
            //从localstorge 中获取搜索的数据
            //			发送 post请求
            var searchContext = this.$store.state.searchContext
            console.log("获取到的搜索关键词默认为:")
            console.log(searchContext)
            this.searchContext = searchContext;
            //调用post方法获取返回的数据
            this.getPostData(this.searchContext);
//				  		console.log(this.numsOfSearch);
            //获取到总的数据 并进行数据绑定的更新
//				  		var searchNums = dataRet.total.value;
//				  		this.numsOfSearch = searchNums;
//						this.contentList.append
        },
        //发送get 请求
        getTest01(){
            //从localstorge 中获取搜索的数据
            //			发送 post请求
            var searchContext = this.$store.state.searchContext
            console.log("获取到的搜索关键词默认为:")
            console.log(searchContext)
            this.searchContext = searchContext;
            //调用post方法获取返回的数据
            this.getGetData(this.searchContext);
//				  		console.log(this.numsOfSearch);
            //获取到总的数据 并进行数据绑定的更新
//				  		var searchNums = dataRet.total.value;
//				  		this.numsOfSearch = searchNums;
//						this.contentList.append
        },
        // 20191128获取数据请求的方法
        getGetData(searchContext){
            axios.get('http://39.96.20.91:8080/subwaycode/content', {
                params : { //请求参数
                    content : searchContext
                }
            }).then((response) => {
                console.log(response);//请求正确时执行的代码
                this.exampleDataField = response.data
            }).catch(function(response){
                console.log(response);//发生错误时执行的代码
            })
        },
        //发送请求获取数据的方法
        getPostData(searchContext){
            axios.post('http://39.96.160.99:9200/gbcode/_search/', {
                "query":{
                    "match":{
                        "code_content": searchContext
                            }
                    },
                    "size": 999,
                    "highlight": {
                            "fields": {
                            "code_content": {}
                        }
                    }
                })
            .then((response) => {
            console.log(response.data);
            // console.log(response.data.hits.hits[0]._source);
//						    return response.data.hits;
//			//获取当前查询到的所有条目总数
            var numsOfSearch_get = response.data.hits.total;						   	
            this.numsOfSearch = numsOfSearch_get;
            console.log("当前获取到的总消息条目数为:");
            console.log(numsOfSearch_get)
            //获取每一个查询到的数组 并存储显示
            for(let i=0;i<numsOfSearch_get;i++){
                //console.log(response.data.hits.hits[i]._source)
                try{
                    var tempVar = (response.data.hits.hits[i]._source.code_content)
                    //console.log(tempVar)
                    //获取到的每条消息的内容
                    this.contentList[i] = tempVar
                }catch(err){
                    console.log("解析错误")
                }
                
                //console.log("循环中..." + i)

                
            }

            
            //对规范中的三个井号进行处理 替换为换行符
            // this.splitContent();
            //对规范中的字符进行关键字正则匹配和标红        
            let splitContextList = searchContext.split("") //分割搜索关键词
            // console.log(splitContextList)
            for(let i = 0 ; i < splitContextList.length ; i ++){
                this.regReplaceAndMarkToRed(splitContextList[i]);
            }
            
            for(let i=0;i<30;i++){
                // console.log(this.contentList[i]);
                
            }
            
            //计算所有的分页数
            this.pageAllCount = parseInt(numsOfSearch_get/10);
            //遍历循环contentList数组 将内容读取到showList中
            //分页 单页显示10个数组
            this.showList = []
            for(let i=0;i<this.contentList.length;i+=10){
                this.showList.push(this.contentList.slice(i,i+10));
            }
            for(let i=0;i<this.contentList.length;i++){
//						    	console.log(this.showList[i][0].code_content);
//						    	console.log(this.showList[i][1].code_content);
//						    	console.log(this.showList[i][2].code_content);
                
            }
            this.pageCount = this.pageCount
            this.showListInstance = this.showList[this.pageCount];
            // console.log("显示当前页面的数据:")
            // console.log(this.showListInstance);
            this.flag = false;
            })
            .catch(function (error) {
                console.log(error);
                this.flag = true;
                console.log(this.flag);
                return null;
            });
        },
        //遍历匹配井号来分割规范内容 变换数组
        
        splitContent(){
            console.log("对规范中的井号字符进行处理...")
//						var reg = /###/i;
//						var testString = "sadkjsajkdhakhja###sdjahksjhd";
//						var testString2 = testString.replace(/###/i,"o");
//						console.log(testString2);
            //console.log(testString);
            for(let i=0;i<this.contentList.length;i++){
                // console.log(this.contentList[i]);
//							var stringNew = this.contentList[i].code_content.replace(/###/i,"$&\r\n");
                //对匹配的字符串进行匹配替换空格换行符等
                var stringNew = this.contentList[i].replace(/###/g,'\n');
                //var stringNew2 = this.contentList[i].code_name.replace(/###/g,'\n');

                this.contentList[i] = stringNew.trim();
                //this.contentList[i].code_name = stringNew2.trim();
                // console.log(this.contentList[i]);
            }
        },
        //对搜索的每一条内容 进行正则匹配标红
        regReplaceAndMarkToRed(searchContext){
            let replaceReg = new RegExp(searchContext, 'g')
                // 高亮替换v-html值
            let replaceString =
            '<span class="search-text" style="color:red">' + searchContext + '</span>'
            for(let i=0;i<this.contentList.length;i++){
                var stringNew = this.contentList[i].replace(replaceReg,replaceString)
                // var stringNew2 = this.contentList[i].code_name.replace(replaceReg,replaceString)
                
                this.contentList[i] = stringNew.trim();
                // this.contentList[i].code_name = stringNew2.trim();
            
            }
        },
        goContentChange(){
            console.log("搜索内容发生变化")
            //console.log()
            localStorage.setItem("searchContext",this.$refs.searchContent.value)
            //从localstorge 中获取搜索的数据
            //			发送 post请求
            var searchContext = localStorage.getItem("searchContext");
            this.searchContext = searchContext;
            //调用post方法获取返回的数据
            this.getPostData(this.searchContext);
//			          	window.open("vue_20190725_04_评论组件的测试使用.html")
        },
        onChange(currentPage){
            this.pageCount = currentPage - 1;
            // console.log("当前选择了页数:" + this.pageCount)
            //传入当前的页数 决定显示数组的哪一部分
            this.showListInstance = this.showList[this.pageCount];
        },
        updated() {
            // 在更新DOM之后 调用此钩子函数 应用：可以获取最新的DOM
            console.log("页面发生更新");
        },
    }
}
</script>

<style scoped>
#contentCard {
    margin-bottom:30px
}
.search-text{
    color: red;
}
</style>