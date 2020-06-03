import Vue from 'vue'
import App from './App.vue'
import router from './router/index'

import ViewUI from 'view-design'
import bootstrapvue from 'bootstrap-vue'
import Echarts from 'echarts'
import store from './vuex/store'
import EchartsWordCloud from 'echarts-wordcloud'
import VueNeo4j from 'vue-neo4j'

import axios from 'axios'
import jquery from 'jquery'
import VueAxios from 'vue-axios'
import Mixins from 'mixins'

// import Annotator from 'poplar-annotation'


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'view-design/dist/styles/iview.css';
import 'animate.css';

Vue.prototype.$echarts = Echarts
Vue.prototype.$eventHub= Vue.prototype.$eventHub ||  new Vue() 



Vue.config.productionTip = false
Vue.use(bootstrapvue)
Vue.use(Echarts)
Vue.use(ViewUI)
Vue.use(axios,VueAxios)
Vue.use(EchartsWordCloud)
Vue.use(VueNeo4j)
Vue.use(Mixins)
Vue.use(jquery)
// Vue.use(Annotator)



new Vue({
  store,
  render: h => h(App),
  router: router
}).$mount('#app')

