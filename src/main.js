import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import App from './App.vue'
import './registerServiceWorker'
const axios = require('axios');

Vue.prototype.$axios = axios;
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  vuetify: new Vuetify({
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#14DA8F',
          accent: '#D200FB',
          secondary: '#26C6DA',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          primary: '#14DA8F',
          accent: '#D200FB',
          secondary: '#26C6DA',
          success: '#8EFF94',
          info: '#42A5F5',
          warning: '#FB8C00',
          error: '#D32F2F'
        }
      }
    }
  }),
  render: h => h(App)
})