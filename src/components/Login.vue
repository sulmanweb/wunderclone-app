<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="jumbotron">
          <h2 class="text-center">Log In</h2>
          <form>
            <div class="form-group">
              <label for="login-auth" class="sr-only">Username / Email*</label>
              <input type="text" class="form-control input-lg"
               id="login-auth" placeholder="Username / Email*" required name="auth">
            </div>
            <div class="form-group">
              <label for="login-password" class="sr-only">Password*</label>
              <input type="password" class="form-control input-lg"
               id="login-password" placeholder="Password*" required name="password">
            </div>
            <button type="submit" class="btn btn-default btn-lg btn-block">
              <i class="fas fa-sign-in-alt"></i> Log In</button>
            <div class="text-center">
              <a href="/#/signup" class="btn btn-default btn-sm">Sign Up</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      com_name: 'Login',
    };
  },
};
</script>
