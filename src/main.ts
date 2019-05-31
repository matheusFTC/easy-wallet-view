import Vue from 'vue';

import 'babel-polyfill';
import './plugins/vuetify';
import '@/assets/theme/stylus/main.styl';
import Notifications from 'vue-notification';

import App from '@/app';
import router from '@/router';
import store from '@/store/index';

Vue.config.productionTip = false;
Vue.use(Notifications);

import moment from 'moment';
import vuemoment from 'vue-moment';
import 'moment/locale/pt-br';

Vue.use(vuemoment, {
  moment,
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
