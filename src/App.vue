<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view :key="$route.fullPath"></router-view>
    <intro-app></intro-app>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import IntroApp from '@/components/IntroApp';

export default {
  name: 'App',
  components: { NavBar, IntroApp },
};
</script>

<style>
body {
  font-size: 18px;
}
</style>
