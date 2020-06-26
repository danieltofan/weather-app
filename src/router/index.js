import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

// Import components used in routing
import Home from '@/components/Home'
import Login from '@/components/Login'
import Register from '@/components/Register'

Vue.use(Router)

// This object contains the routing urls and parameters; each route corresponds to an individual component
const router = new Router({
  routes: [
    {
      path: '*', 
      redirect: '/login'  // users must be logged in to use the app
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        requiresAuth: true  // the home view is displayed upon authentication
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login  // displays the Login view
    },
    {
      path: '/register',
      name: 'Register',
      component: Register // displays the Register view
    }
  ]
})

// intercept the route and check the authentication status before each navigation request
router.beforeEach((to, from, next) => {
  // get the current user
  let currentUser = firebase.auth().currentUser
  // determine whether the route requires authentication
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  // if not logged in and needs authentication, go to Login
  if (requiresAuth && !currentUser) next('Login')
  // if logged in, do not request authentication, just go to Home
  else if (!requiresAuth && currentUser) next('Home')
  // proceed without change otherwise
  else next()
})

// this exports the router module
export default router