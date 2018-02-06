<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="jumbotron">
          <h2 class="text-center">Log In</h2>
          <form>
            <div class="alert alert-danger" role="alert" v-for="error in errors"
             :key="error">{{ error }}</div>
            <div class="form-group">
              <label for="login-auth" class="sr-only">Username / Email*</label>
              <input type="text" class="form-control input-lg"
               id="login-auth" placeholder="Username / Email*" required name="auth"
               v-model="form_data.auth">
            </div>
            <div class="form-group">
              <label for="login-password" class="sr-only">Password*</label>
              <input type="password" class="form-control input-lg"
               id="login-password" placeholder="Password*" required name="password"
               v-model="form_data.password">
            </div>
            <button type="submit" class="btn btn-default btn-lg btn-block"
             @click.prevent="submitLogin">
              <i class="fas fa-sign-in-alt"></i> Log In</button>
            <div class="text-center">
              <router-link class="btn btn-default btn-sm"
               :to="{name: 'SignUp'}">Sign Up</router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HTTP from '../http_common';

export default {
  name: 'Login',
  data() {
    return {
      form_data: {},
      com_name: 'Login',
      errors: [],
    };
  },
  methods: {
    submitLogin() {
      HTTP.post('/auth/sign_in', this.form_data)
        .then(response => {
          // Set localstorage with keys
          localStorage.setItem(
            'session',
            JSON.stringify(response.data.session)
          );
          localStorage.setItem(
            'current_user',
            JSON.stringify(response.data.user)
          );
          // Show toast for success
          this.$toasted.show('You are logged in successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        })
        .catch(e => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>
