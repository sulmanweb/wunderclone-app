<template>
  <div id="app">
    <nav-bar></nav-bar>
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar';

export default {
  name: 'App',
  components: { NavBar },
};
</script>

<style>
body {
  font-size: 18px;
}
</style>
