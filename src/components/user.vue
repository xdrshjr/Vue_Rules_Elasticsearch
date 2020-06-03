<template>
    <div>
        <h2>
            我是用户界面
        </h2>
        <p>
            我是用户的相关信息
        </p>
    </div>
</template>

<script>
export default {
    name:'user',
    // 创建计算对象 返回当前传入值的userid
    computed: {
        userId() {
            return this.$route.param.user001
        }
    }
}
</script>