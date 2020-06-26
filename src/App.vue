<template>
  <b-container>
    <b-navbar fixed="top" toggleable="sm" type="dark">
      <b-navbar-brand class="p-1"><i class="wi wi-day-lightning" v-b-tooltip.hover title="WeatherApp by Daniel Tofan"></i></b-navbar-brand>
      <transition name="fade" mode="in-out">
        <b-button id="logout" variant="danger" size="sm" @click="logout" class="ml-auto" v-show="isLoggedIn()">Log Out</b-button>
      </transition>
    </b-navbar>

    <div id="app">
      <div class="p-5">
        <i class="wi wi-day-lightning wi-lg"></i>
      </div>
      <!-- Using an animation to make the transitions between views visually pleasant -->
      <transition name="fade" mode="out-in">
        <!-- All routed views will be displayed in this element -->
        <router-view/>
      </transition>
    </div>
  </b-container>
</template>

<script>
/* Use Firebase for authentication and storage (if needed) */
import firebase from 'firebase'

/**
 * This is the main App component.
 */
export default {
  name: 'App',
  methods: {
    // handler for the Log Out button on the navbar
    logout: function() {
      firebase.auth().signOut().then(
        () => {
          console.log('you are logged out')
          this.$router.replace('login')
        }
      );
    },
    // check authentication status against Firebase
    isLoggedIn: function() {
      return firebase.auth().currentUser
    }
  }
}
</script>

<!-- These styles apply to the entire app -->
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 30px;
}
nav.navbar {
  background-color: #272B30;
  border: none;
}
.navbar-brand {
  border-right: none;
}
/* Large weather icon */
.wi-lg {
  font-size: 80px;
}
#logout {
  padding-top: 1px;
}
/* Define the transitions for view switching */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
</style>