import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import SignUp from '@/components/SignUp';
import Login from '@/components/Login';
import Toasted from 'vue-toasted';

Vue.use(Router);
Vue.use(Toasted, {
  theme: 'outline',
  position: 'top-center',
  duration: 5000,
  iconPack: 'fontawesome',
});

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
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
  ],
});
