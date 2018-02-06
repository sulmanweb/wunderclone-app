<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="jumbotron">
          <h2 class="text-center">Sign Up</h2>
          <form>
            <div class="form-group">
              <label for="signup-name" class="sr-only">Name</label>
              <input type="text" class="form-control input-lg" id="signup-name" placeholder="Name">
            </div>
            <div class="form-group">
              <label for="signup-username" class="sr-only">Username*</label>
              <input type="text" class="form-control input-lg"
               id="signup-username" placeholder="Username*" required>
            </div>
            <div class="form-group">
              <label for="signup-email" class="sr-only">Email*</label>
              <input type="email" class="form-control input-lg"
               id="signup-email" placeholder="Email*" required>
            </div>
            <div class="form-group">
              <label for="signup-password" class="sr-only">Password*</label>
              <input type="password" class="form-control input-lg"
               id="signup-password" placeholder="Password*" required>
            </div>
            <button type="submit" class="btn btn-default btn-lg btn-block">
              <i class="fas fa-sign-in-alt"></i> Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      com_name: 'SignUp',
    };
  },
};
</script>
