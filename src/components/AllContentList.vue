<template>
    <div>
        <div id="chooseBar">

            
            <b-form-select style="margin-left:0px;margin-top:10px" v-model="selected_1" :options="options_1">规范名</b-form-select>
            <b-form-select style="margin-left:10px;margin-top:10px" v-model="selected_2" :options="options_2">规范目录</b-form-select>
            <b-form-select style="margin-left:10px;margin-top:10px" v-model="selected_3" :options="options_3">规范小章节</b-form-select>

            <b-button variant="primary" style="margin:10px;text-align:Center" @click="searchText()">Search</b-button>
        </div>
        <!-- <div>
            <h6>测试模块</h6>
            <div class="mt-3">Selected_1: <strong>{{ selected_1 }}</strong></div>
            <div class="mt-3">Selected_2: <strong>{{ selected_2 }}</strong></div>
            <div class="mt-3">Selected_3: <strong>{{ selected_3 }}</strong></div>
        </div> -->
        <b-card
            title="规范内容"
            img-src="http://132.232.247.209:8080/railWay.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 200rem;max-height: 80rem;"
            class="mb-2"
        >
            <b-card-text v-html="ruleContent">
            展示规范具体内容的区域
            </b-card-text>

            
        </b-card>
    </div>
  
</template>

<script>
import exampleData from '../data/example_title'
import axios from 'axios'
export default {
    name:'about',
    data () {
        return {
            // 外部导入的数据
            ruleContent: "请选择目录查询规范内容",
            exampleData: [],
            // 外部导入用来测试的数据
            dataFromExample: [],
            isRouterAlive: true,
            selected_1: null,
            selected_2: null,
            selected_3: null,
            selected_1_default: "地铁设计规范 GB 50157-2013",
            selected_2_default: "3 运营组织",
            options_1: [
                { value: null, text: '选择规范名' },
                { value: 'a', text: 'asdas' },
                { value: 'b', text: '选择规范章节' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            options_2: [
                { value: null, text: '选择规范目录' },
                { value: 'a', text: '选择规范目录' },
                { value: 'b', text: '' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ],
            options_3: [
                { value: null, text: '选择规范章节' },
                { value: 'a', text: '选择规范目录' },
                { value: 'b', text: '选择规范章节' },
                { value: { C: '3PO' }, text: 'This is an option with object value' },
                { value: 'd', text: 'This one is disabled', disabled: true }
            ]
        }
    },
    created: function() {
        this.reload()
        
        // 默认组件加载后 读取json文件获取三个类别的规范标题数据
        this.getDataFromNative(exampleData)

                    // 向ES发送请求 获取数据
            axios.post('http://39.96.160.99:9200/codeallcontent/_search/', {
                    "query": {
                        "match": {
                        "code_id" : 1073277
                        }
                    }
            })
            .then((response) => {
                console.log(response)
                this.ruleContent = response.data.hits.hits[0]._source.code_content
                // console.log(this.ruleContent)
            }).catch(function(){
                alert("未找到数据")
            })
    },
    // 监听数据发生的变化
    watch: {
        'selected_1': function(newVal){
            console.log(newVal)
            this.selected_1_default = newVal
            this.getDataFromNative(exampleData)
        },
        'selected_2': function(newVal){
            console.log(newVal)
            this.selected_2_default = newVal
            this.getDataFromNative(exampleData)
        },
        'selected_3': function(newVal){
            console.log(newVal)
            this.selected_3_default = newVal
            this.getDataFromNative(exampleData)
        }
    },
    methods: {
        // 刷新组件的方法
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        },
        // 根据用户的选择进行搜索
        searchText:function(){

            console.log("用户点击了搜索按钮")
            let tempSearchContext = this.selected_3
            console.log(tempSearchContext)
            // 利用正则表达式对字符串匹配获取需要获取的规范id
            let tempSearchContextID = tempSearchContext.substring(tempSearchContext.length - 7)
            console.log(tempSearchContextID)
            // 向ES发送请求 获取数据
            axios.post('http://39.96.160.99:9200/codeallcontent/_search/', {
                    "query": {
                        "match": {
                        "code_id" : tempSearchContextID
                        }
                    }
            })
            .then((response) => {
                console.log(response)
                this.ruleContent = response.data.hits.hits[0]._source.code_content
                // console.log(this.ruleContent)
            }).catch(function(){
                alert("未找到数据")
            })
            
        },


        // 获取本地json数据的方法
        getDataFromNative: function(exampleData){
            this.dataFromExample = exampleData
            // console.log(this.dataFromExample)

            // 1.存储所有规范名的数据
            this.options_1 = [{ value: null, text: '选择规范名' }];
            this.option_1_temp = {};    //用来插入数据的临时字典数据
            for(let i in this.dataFromExample){
                // console.log(i)
                // console.log(this.dataFromExample[i])
                this.option_1_temp.value = i
                this.option_1_temp.text = i
                this.options_1.push(this.option_1_temp)
                this.option_1_temp = {}
            }
            // console.log(this.options_1)


            // 2.根据规范名 获取规范名对应的数据 存储所有规范名的章名数据
            let temp_Rule_Title = this.selected_1_default  //临时指定的规范名 用这个规范名来查询对应的子目录
            let temp_Rule_Value = this.dataFromExample[temp_Rule_Title]
            this.options_2 = [{ value: null, text: '选择规范目录' }];
            console.log(temp_Rule_Value)
            for(let i in temp_Rule_Value){
                // console.log(i)
                this.options_2.push(i)
            }

            // 3.根据规范名 以及章节名 获取所有的子章节数据
            this.options_3 = [{ value: null, text: '选择规范目录' }];
            let temp_Rule_Title_NextTitle = this.selected_2_default  //临时指定的规范子目录名 用这个子目录名来查询对应的下一级子目录
            let temp_Rule_Value_NextValue = temp_Rule_Value[temp_Rule_Title_NextTitle]
            console.log(temp_Rule_Value_NextValue)
            for(let i in temp_Rule_Value_NextValue){
                // console.log(temp_Rule_Value[i])
                this.options_3.push(temp_Rule_Value_NextValue[i])
            }
        }
    }
}
</script>

<style>
    #chooseBar {
        display: flex;
        justify-content: Center;
    }
    #texta {
        /* text-align: center; */
        writing-mode: horizontal-tb
        
    }
</style>