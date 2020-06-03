import Vue from 'vue'
import VueX from 'vuex'


Vue.use(VueX)


// 实例化暴露Store
export default new VueX.Store({
    state: {
        count: 0,
        searchContext: "地铁车站",
        flagInSearchNetError: true,
        searchKeyWord:'地铁车站',
        searchContextID:'28.7.1'
    },
    // 改变store数值的方法
    mutations: {
        add() {
          this.state.count++
        },
        // 改变vuex中搜索数据的方法
        changeSearchContext(searchContext) {
            this.state.searchContext = searchContext
        },
        // 改变flagInSearchNetError
        changeFlagInSearchNetError(flagInSearchNetError) {
            this.state.flagInSearchNetError = flagInSearchNetError
        },
        //修改vuex中的搜索关键词和搜索ID的方法
        changeSearchKeyWord(searchKeyWord){
            this.state.searchKeyWord = searchKeyWord
        },
        changesSearchContextID(searchContextID){
            this.state.searchContextID = searchContextID
        }
    }
})