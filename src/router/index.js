import Vue from 'vue';
import Router from 'vue-router';
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import Home from '@/components/Home';
import ListView from '@/components/ListView';
import Toasted from 'vue-toasted';
import VueSwal from 'vue-swal';
import VueAnalytics from 'vue-analytics';

Vue.use(Router);
Vue.use(Toasted, {
  theme: 'outline',
  position: 'top-center',
  duration: 5000,
  iconPack: 'fontawesome',
});
Vue.use(VueSwal);
Vue.use(VueAnalytics, {
  id: 'UA-113865633-1',
  Router,
});

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/lists/:id',
      props: route => ({ id: Number(route.params.id) }),
      name: 'ListView',
      component: ListView,
    },
  ],
});
