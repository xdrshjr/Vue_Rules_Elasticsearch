<template>
    <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
        <b-navbar-brand href="#">轨道交通规范</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item href="#">Link</b-nav-item>
            <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
            <b-navbar-brand>
            <input ref="searchContent" type="text" class="form-control" placeholder="Search" style="height:30px">
            <!-- <button @click="childMethod">测试组件方法调用</button> -->
            </b-navbar-brand>
            <b-button size="sm" class="my-2 my-sm-0" @click="childMethod" @keyup.enter='childMethod'>搜索</b-button>

            <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template v-slot:button-content>
                <em>用户</em>
            </template>
            <b-dropdown-item href="#">我的</b-dropdown-item>
            <b-dropdown-item href="#">注销</b-dropdown-item>
            </b-nav-item-dropdown>
        </b-navbar-nav>
        </b-collapse>
    </b-navbar>
    </div>
</template>

<script>
// 引入公共事件处理器
import EventBus from '../commonjs/eventBus'

export default {
    name:'navigator',
    // 将父组件方法传入子组件 以方便调用
    props: {
       
    },
    data() {
        return {
            searchContent : '默认搜索内容'
        }
    },
    conponents: {
        // 下方内容显示组件是这个导航栏的子组件 导航向显示内容组件传值
        
    },
    methods:{
        // 改变搜索内容的方法 向外暴露 以供显示内容组件监听
        childMethod() {
            if(this.$refs.searchContent.value != "" && this.$refs.searchContent.value != null){
                this.$store.commit('changeSearchContext',this.$refs.searchContent.value.replace(/( )/g,""))
                console.log("当前搜索内容发生改变：" + this.$refs.searchContent.value.replace(/( )/g,""))
                // 当前状态改变事件向外暴露
                // 子组件向父级暴露数据发生改变
                this.searchContent = this.$refs.searchContent.value.replace(/( )/g,"")
                // this.$emit('changedContent',this.searchContent)
                EventBus.$emit('changedContent',this.searchContent)
            }else {
                alert("搜索内容未空 请检查")
            }
        },
        goContentChange() {
            console.log("搜索内容发生改变")
            localStorage.setItem("searchContext",this.$refs.searchContent.value)
            console.log(this.$refs.searchContent.value)
            // 通过使用vuex来改变pagecount数值
            this.$store.commit('changeSearchContext',this.$refs.searchContent.value)
            console.log(this.$store.state.searchContext)
            
            
            
            // 把获得的搜索参数传入全局变量空间中
            //localStorage.setItem("searchContext",this.$refs.searchContent.value)
            //从localstorge 中获取搜索的数据
            //			发送 post请求
            //var searchContext = this.$store.state.searchContext
            //ContentList.searchContext = searchContext;
            //调用post方法获取返回的数据
            //ContentList.getPostData(searchContext);
        }
    }
}
</script>