<template>
    <b-container>
        <b-form @submit.prevent="login" @reset.prevent="onReset" v-if="show">
        <b-form-group breakpoint="lg" class="col" id="emailInputGroup">
            <b-form-input id="emailInput"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
            </b-form-input>
        </b-form-group>

        <b-form-group class="col" id="pwInputGroup">
            <b-form-input id="pwInput"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Password">
            </b-form-input>
        </b-form-group>

        <b-button type="submit" variant="success" class="px-5" :disabled="submitted">Login</b-button>

        <div class="mt-3">
            No account?
            <router-link to="/register" class="text-danger">Register here</router-link>
        </div>

        </b-form>
    </b-container>
</template>

<script>
/**
 * This is the Login component, which will display a login form.
 */
import firebase from 'firebase'

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      show: true,   // optional, to allow the form to be hidden
      submitted: false  // helps disable the Login button right after submission
    };
  },
  methods: {
    // handler for the login button; note that there is no logout handler here, as the Log Out button will be available to the entire app
    login: function() {
        this.submitted = true
        firebase.auth().signInWithEmailAndPassword(this.form.email, this.form.password).then(
            user => {
                console.log(`You are logged in as ${user.user.displayName}`)
                this.$router.replace('home')
            },
            err => {
                console.log(err)
                this.submitted = false
                // show an error toaster to the user
                this.$toaster.error(err.message)
            }
        );
    },
    // handler for the reset button
    onReset(evt) {
      //evt.preventDefault();
      /* Reset our form values */
      this.form.email = "";
      this.form.password = "";
      this.form.name = "";
      /* Trick to reset/clear native browser form validation state */
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<!-- The "scoped" attribute limits CSS to this component only -->
<style scoped>
form {
  max-width: 600px;
  margin: auto;
}
</style>
