// library
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en';

// store
import store from './store/store';

import App from './App.vue'

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale: locale });

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
