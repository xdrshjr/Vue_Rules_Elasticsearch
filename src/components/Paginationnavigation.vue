<template>
    <div class="overflow-auto">
        <b-pagination-nav :link-gen="linkGen" :number-of-pages="10" use-router @on-change="onChange"></b-pagination-nav>
    </div>
</template>

<script>
export default {
    name:'Paginationnavigation',
    methods: {
      linkGen(pageNum) {
        console.log("点击了换页按钮...")
        return pageNum === 1 ? '?' : `?page=${pageNum}`
      },
      onChange(){
        
      }
    }
  }
</script>