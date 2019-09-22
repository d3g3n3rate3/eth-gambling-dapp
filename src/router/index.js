import Vue from 'vue';
import Router from 'vue-router';

import Home from './Home.vue';
import CoinFlip from './CoinFlip.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/coinFlip',
      name: 'CoinFlip',
      component: CoinFlip
    }
  ]
});
