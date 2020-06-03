<template>
    <div>
        <!-- <span>{{count}}</span> 
        <button @click="addCount">+</button> -->
        <h2>
            <!-- 我是首页 -->
        </h2>
        <p>
            <!-- 我是首页内容 -->
        </p>
        <slot name='contentList'></slot>
        <div id="slotPanel">
            <slot name="numberOfPage"></slot>
        </div>
        
    </div>
</template>

<script>
export default {
    name:'home',
    // 计算属性
    computed: {
        count() {
        return this.$store.state.count
      }
    },
    methods: {
      addCount() {
        this.$store.commit('add')
      }
    }
}
</script>

<style scoped>
#slotPanel{
    margin-top: 10px
}
</style>