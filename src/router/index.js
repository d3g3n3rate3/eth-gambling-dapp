import Vue from 'vue';
import Router from 'vue-router';

import Home from '@/router/Home.vue';
import Profile from '@/router/profile/Profile.vue';
import CoinFlip from '@/router/CoinFlip.vue';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
    },
    {
      path: '/coin_flip',
      name: 'CoinFlip',
      component: CoinFlip,
    }
  ]
});
