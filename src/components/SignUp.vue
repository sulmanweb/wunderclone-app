<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="jumbotron">
          <h2 class="text-center">Sign Up</h2>
          <form>
            <div class="alert alert-danger" role="alert" v-for="error in errors"
             :key="error">{{ error }}</div>
            <div class="form-group">
              <label for="signup-name" class="sr-only">Name</label>
              <input type="text" class="form-control input-lg" id="signup-name"
               placeholder="Name" name="name" v-model="form_data.name">
            </div>
            <div class="form-group">
              <label for="signup-username" class="sr-only">Username*</label>
              <input type="text" class="form-control input-lg"
               id="signup-username" placeholder="Username*" required name="username"
               v-model="form_data.username">
            </div>
            <div class="form-group">
              <label for="signup-email" class="sr-only">Email*</label>
              <input type="email" class="form-control input-lg"
               id="signup-email" placeholder="Email*" required name="email"
               v-model="form_data.email">
            </div>
            <div class="form-group">
              <label for="signup-password" class="sr-only">Password*</label>
              <input type="password" class="form-control input-lg"
               id="signup-password" placeholder="Password*" required name="password"
               v-model="form_data.password">
            </div>
            <button type="submit" class="btn btn-default btn-lg btn-block"
             @click.prevent="submitSignUp"><i class="fas fa-sign-in-alt"></i> Sign Up</button>
            <div class="text-center">
              <router-link class="btn btn-default btn-sm" :to="{name: 'Login'}">Login</router-link>
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
  name: 'SignUp',
  data() {
    return {
      form_data: {},
      com_name: 'SignUp',
      errors: [],
    };
  },
  methods: {
    submitSignUp() {
      HTTP.post('/auth/sign_up', this.form_data)
        .then((response) => {
          // Show toast for success
          this.$toasted.show('You are signed up successfully', {
            icon: 'check-circle',
            action: {
              text: 'CLOSE',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
          // redirect to login
          this.$router.push({ name: 'Login' });
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>
