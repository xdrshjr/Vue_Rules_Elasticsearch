<template>
    <div id="tagPage">

    </div>
</template>

<script>
import {Annotator} from 'poplar-annotation'

export default {
    name:'about',
    data () {
        return {
            isRouterAlive: true
        }
    },
    created: function() {
        this.reload()
        new Annotator({"a":"asdas"},tagPage, Object)
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