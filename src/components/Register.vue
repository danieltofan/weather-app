<template>
    <b-form @submit.prevent="register" @reset="onReset" v-if="show">
    <b-form-group   id="emailInputGroup"
                    label="Email address:"
                    label-for="emailInput"
                    description="Your email won't be shared with anyone else."
                    horizontal>
        <b-form-input id="emailInput"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Enter email">
        <b-form-invalid-feedback ></b-form-invalid-feedback>
        </b-form-input>
    </b-form-group>

    <b-form-group id="pwInputGroup"
                    label="Password:"
                    label-for="pwInput"
                    description="Password should be at least 6 characters"
                    horizontal>
        <b-form-input id="pwInput"
                    type="password"
                    v-model="form.password"
                    required
                    placeholder="Password">
        </b-form-input>
    </b-form-group>

    <b-form-group id="nameInputGroup"
                    label="Your Name:"
                    label-for="nameInput"
                    horizontal>
        <b-form-input id="nameInput"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="First and last name">
        </b-form-input>
    </b-form-group>

    <b-button type="submit" variant="success" class="px-3" :disabled="submitted">Register</b-button>
    <b-button type="reset" variant="warning" class="px-4" :disabled="submitted">Reset</b-button>

    <div class="mt-3">
        Already have an account?
        <router-link to="/login" class="text-info">Log In</router-link>
    </div>
    </b-form>
</template>

<script>
import firebase from 'firebase'

/**
 * This is the Register component, used to display a registration form that will be used to create a new account.
 */
export default {
  name: "Register",
  data () {
    return {
      form: {
        email: '',
        password: '',
        name: ''
      },
      show: true,
      submitted: false
    }
  },
  methods: {
    // handler for the Register button
    register: function() {
      this.submitted = true

      firebase.auth().createUserWithEmailAndPassword(this.form.email, this.form.password)
      .then(user => user.user.updateProfile({displayName: this.form.name}) )  // update the user's display name in Firebase after registration
      .then(
        user => {
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
    // handler for the Reset button
    onReset (evt) {
      evt.preventDefault()
      console.log('resetting form')
      // Reset our form values 
      this.form.email = ''
      this.form.name = ''
      this.form.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false;
      this.$nextTick(() => { this.show = true })
    }
  }
};
</script>

<!-- The "scoped" attribute limits CSS to this component only -->
<style scoped>
form {
    max-width: 800px;
    margin: auto;
}
/* Adjust the form width for small screens */
@media screen and (max-width: 799px) {
  form {
      max-width: 600px;
  }
}
</style>
