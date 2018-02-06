<template>
  <div class="container">
    <h2>Home Component</h2>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      com_name: 'Home',
    };
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('session') !== null;
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' });
    }
  },
};
</script>
