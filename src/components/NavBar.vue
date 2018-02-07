<template>
  <nav class="navbar navbar-inverse">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed"
         data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </button>
        <router-link class="navbar-brand" :to="{name: 'Home'}">WunderClone</router-link>
        <!-- <a class="navbar-brand" href="/#/">WunderClone</a> -->
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul class="nav navbar-nav navbar-right">
          <li v-show="!isLoggedIn"><router-link :to="{ name: 'Login' }">
            <i class="fas fa-sign-in-alt"></i> Login</router-link></li>
          <li v-show="!isLoggedIn"><router-link :to="{ name: 'SignUp' }">
            <i class="fas fa-sign-in-alt"></i> Sign Up</router-link></li>
          <li v-show="isLoggedIn"><a href="" @click.prevent="logoutUser">
            <i class="fas fa-sign-out-alt"></i> Logout</a></li>
          <!-- <li class="dropdown">
            <a href="#" class="dropdown-toggle"
             data-toggle="dropdown" role="button" aria-haspopup="true"
             aria-expanded="false">Dropdown <span class="caret"></span></a>
            <ul class="dropdown-menu">
              <li><a href="#">Action</a></li>
              <li><a href="#">Another action</a></li>
              <li><a href="#">Something else here</a></li>
              <li role="separator" class="divider"></li>
              <li><a href="#">Separated link</a></li>
            </ul>
          </li> -->
        </ul>
      </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
  </nav>
</template>

<script>
import HTTP from '../http_common';

export default {
  name: 'NavBar',
  data() {
    return {
      com_name: 'NavBar',
      isLoggedIn: false,
    };
  },
  methods: {
    logoutUser() {
      // set headers
      const headers = { headers: {} };
      const session = JSON.parse(localStorage.getItem('session'));
      headers.headers.sid = session.sid;
      headers.headers.utoken = session.utoken;
      HTTP.delete('/auth/sign_out', headers)
        .then(response => {
          // remove local storage
          localStorage.removeItem('session');
          localStorage.removeItem('current_user');
          // toast about success
          this.$toasted.show('You are logged out successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // Emit event of logged in user
          this.$bus.$emit('logged', 'User logged out');
          // redirect to login page
          this.$router.push({ name: 'Login' });
        })
        .catch(error => {});
    },
  },
  mounted() {
    this.isLoggedIn = localStorage.getItem('session') !== null;
    if (!this.isLoggedIn) {
      this.$router.push({ name: 'Login' });
    }
    this.$bus.$on('logged', () => {
      this.isLoggedIn = localStorage.getItem('session') !== null;
      if (!this.isLoggedIn) {
        this.$router.push({ name: 'Login' });
      }
    });
  },
};
</script>
