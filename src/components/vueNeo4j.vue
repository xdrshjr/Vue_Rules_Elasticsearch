<template>
    <b-container fluid>
    <div>
        <p style="margin-top: 30px">
            说明:NER是NLP领域的一个重要应用,重要是对文本中的实体进行识别。
        </p>
    </div>
    <b-row style="margin-top:30px">
        <b-col sm="2">
        <label for="textarea-auto-height">原始文本:</label>
        </b-col>
        <b-col sm="10">
        <b-form-textarea
            id="textarea-no-auto-height"
            placeholder="Auto height (no-shrink)  textarea"
            rows="3"
            max-rows="8"
            v-model="dataResource"
        ></b-form-textarea>
        </b-col>
    </b-row>
    <b-button variant="primary" style="margin:30px auto" @click="goNer()">Go NER!!
        <b-spinner small type="grow"></b-spinner>
            
    </b-button>

    <!-- 这是NER识别区域代码 -->
    <b-row class="mt-2">
        <b-col sm="2">
        <label for="textarea-no-auto-shrink">NER识别结果:</label>
        </b-col>
        <b-col sm="10">
        <b-form-textarea
            id="textarea-no-auto-shrink"
            placeholder="Auto height (no-shrink) textarea"
            rows="3"
            max-rows="8"
            no-auto-shrink
            v-model="dataResult"
        ></b-form-textarea>
        </b-col>
    </b-row>
    <div style="margin-top:30px">
        <p>查询进度:</p>
        <b-progress :value="value" :max="max" show-progress animated></b-progress>
        <!-- <b-button class="mt-3" @click="randomValue">Click me</b-button> -->
    </div>
    </b-container>
</template>

<script>
import axios from 'axios'
import $ from 'jquery'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default {
    name: 'vueNeo4j',
    data() {
        return {
            protocol: 'aaa',
            host: 'aaa',
            port: 7688,
            username: 'neo4j',
            password: 'aaa',
            // 进度条使用
            value: 0,
            max: 100,
            // NER原始文本
            dataResource: "地铁车站应具备站台层和站厅层",
            // NER识别结果
            dataResult: "这里将显示NER识别结果"
        }
    },
    methods: {
        // 测试进度条代码
        randomValue() {

            this.value = Math.random() * this.max
        },
        connect() {
            console.log("点击了连接按钮")
           return this.$neo4j.connect(this.protocol, this.host, this.port, this.username, this.password)
        },
        driver() {
            // Get a driver instance
            return this.$neo4j.getDriver()
        },
        testQuery() {
            // Get a session from the driver
            const session = this.$neo4j.getSession()

            session.run('MATCH (n) RETURN count(n) AS count')
                .then(res => {
                    console.log(res.records[0].get('count'))
                })
                .then(() => {
                    session.close()
                })
        },

        // goNer的鼠标点击事件
        goNer: function(){
            // console.log("点击了NER识别按钮")
            // console.log(this.dataResource)
            // 调用API接口访问远程服务器获取NER识别结果
            // axios.post("http://39.96.20.91:8077/ner/getNER",{
            //     "source": "地铁车站应具备站台层和站厅层"
            // }).then((response) => {
            //     console.log(response.data)
            // })

            //进度条代码
            this.value = 0
            var i = 0
            var t1 = window.setInterval(()=>{
                this.value = i++
            },40);
            $.ajax({
                url: 'http://39.96.20.91:8077/ner/getNER',
                type: 'post',
                dataType: 'JSON',
                withCredentials: true,
                data:{
                    "source": this.dataResource
                },
                success: (response) => {
                    console.log(JSON.stringify(response))
                    this.dataResult = JSON.stringify(response).replace(/,/g,'\n').replace(/\[/g,'\n').replace(/\]/g,"").replace('{',"").replace('}',"")
                    console.log(this.dataResult)
                    window.clearInterval(t1);
                    this.value = 100
                },
                error: function(){
                    console.log("请求失败")
                    window.clearInterval(t1);
                    this.value = 100
                }
            })
        }
    }
}

</script>

<style scoped>
#slotPanel{
   
}
</style>