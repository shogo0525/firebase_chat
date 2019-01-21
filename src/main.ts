import Vue from 'vue';
import './plugins/firebase';
import './plugins/element';
import App from './App.vue';
import router from './router';
import store from './store';
import { authMiddleware } from '@/api/auth';

Vue.config.productionTip = false;

router.beforeEach(authMiddleware);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
