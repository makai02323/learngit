// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.timeout = 8000
import common from './assets/js/common'
import VueI18n from 'vue-i18n'
import echarts from 'echarts'


import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

//设置导航守卫
import './routers/router'

Vue.use(VueQuillEditor);

Vue.config.productionTip = false;
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;

Vue.use(common);
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'zh', // 语言标识
  messages: {
    'zh': require('./assets/lang/zh'),
    'en': require('./assets/lang/en')
  }
})


import './assets/css/reset.css'
import './assets/js/jquery-1.12.2'
import './assets/bootstrap-3.3.7-dist/css/bootstrap.css'
import './assets/bootstrap-3.3.7-dist/js/bootstrap.js'
import './assets/css/common.css'
import '../static/fonts/fonts.css'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  components: { App },
  template: '<App/>'
});


