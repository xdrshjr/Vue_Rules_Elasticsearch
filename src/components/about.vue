<template>
    <div>
        <h2>
            关于
        </h2>

        <p style="margin-top: 30px">
            主要适用于轨道交通规范的查询与展示
            
        </p>
        <p style="margin-top: 30px">
            
            已适配移动端 欢迎使用
        </p>
        <p style="margin-top: 30px">
            版权所有：XAUT 计算机工程学院 KG组
            
        </p>
        <p style="margin-top: 30px">
            成员：保密
            
        </p>
    </div>
</template>

<script>
export default {
    name:'about',
    data () {
        return {
            isRouterAlive: true
        }
    },
    created: function() {
        this.reload()
    },
    methods: {
        // 刷新组件的方法
        reload () {
            this.isRouterAlive = false
            this.$nextTick(() => (this.isRouterAlive = true))
        }
    }
}
</script>