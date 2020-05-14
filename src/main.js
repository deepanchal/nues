import Vue from 'vue'
import Vuetify from 'vuetify/lib';
import App from './App.vue'
const axios = require('axios');

Vue.prototype.$axios = axios;
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: false
    }
  }),
  render: h => h(App)
})