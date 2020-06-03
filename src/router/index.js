import Vue from "vue"
import VueRouter from "vue-router"
//导入路由组件
// import Home from "../components/home"
// import About from "../components/about"
// import User from "../components/user"
// import Profile from "../components/profile"
// import Graph from '../components/graph'
// import WordCloud from '../components/wordCloud'
// import VueNeo4j from '../components/vueNeo4j'
// const Home = () => import("@/components/home")
// const About = () => import("@/components/about")
// const User = () => import("@/components/user")
// const Profile = () => import("@/components/profile")
// const Graph = () => import("@/components/graph")
// const WordCloud = () => import("@/components/wordCloud")
// const VueNeo4j = () => import("@/components/vueNeo4j")
// 1.安装插件
Vue.use(VueRouter)

// 2.创建一个vuerouter对象
const routes = [
    //首页自动展示的路由配置
    {
        path:'',
        redirect:'/ContentList_ES',
    },
    // 待测试
    // {
    //     path: "/home",
    //     name: "Home",
    //     component: Home
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     component: About
    // },
    // {
    //     path: "/user",
    //     name: "User",
    //     component: User
    // },
    // {
    //     path: "/profile",
    //     name: "Profile",
    //     component: Profile
    // },
    // {
    //     path: "/graph",
    //     name: "Graph",
    //     component: Graph
    // },
    // {
    //     path: "/wordCloud",
    //     name: "WordCloud",
    //     component: WordCloud
    // },
    // {
    //     path: "/vueNeo4j",
    //     name: "VueNeo4j",
    //     component: VueNeo4j
    // },

    {
        path: "/home",
        name: "Home",
        component: (resolve) => require(['@/components/home'],resolve)
    },
    {
        path: "/about",
        name: "About",
        component: (resolve) => require(['@/components/about'],resolve)
    },
    {
        path: "/user",
        name: "User",
        component: (resolve) => require(['@/components/user'],resolve)
    },
    {
        path: "/profile",
        name: "Profile",
        component: (resolve) => require(['@/components/profile'],resolve)
    },
    {
        path: "/graph",
        name: "Graph",
        component: (resolve) => require(['@/components/graph'],resolve)
    },
    {
        path: "/wordCloud",
        name: "WordCloud",
        component: (resolve) => require(['@/components/wordCloud'],resolve)
    },
    {
        path: "/vueNeo4j",
        name: "VueNeo4j",
        component: (resolve) => require(['@/components/vueNeo4j'],resolve)
    },
    {
        path: "/allContentList",
        name: "AllContentList",
        component: (resolve) => require(['@/components/AllContentList'],resolve)
    },
    {
        path: "/contentList_ES",
        name: "ContentList_ES",
        component: (resolve) => require(['@/components/ContentList_ES'],resolve)
    },
    {
        path: "/vueNeo4j_ner_normal",
        name: "VueNeo4j_ner_normal",
        component: (resolve) => require(['@/components/vueNeo4j_ner_normal'],resolve)
    },
    {
        path: "/tagPage",
        name: "TagPage",
        component: (resolve) => require(['@/components/tagPage'],resolve)
    },
]
const vueRouter = new VueRouter({
    // 配置路由和组件之间的映射关系
    routes,
    //不显示#hash字符
    mode:"history"
})

// 3.将vueRouter对象传入到vue实例中
export default vueRouter