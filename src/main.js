import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import firebase from 'firebase'
import BootstrapVue from "bootstrap-vue"
import VueGeolocation from 'vue-browser-geolocation'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueMoment from 'vue-moment'
import Toaster from 'v-toaster'

// Import style sheets and fonts separately
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootswatch/dist/slate/bootstrap.min.css'
import 'weather-icons/css/weather-icons.min.css'
import './assets/css/weather-icons-wind.min.css'
import 'weather-icons/font/WeatherIcons-Regular.otf'
import 'weather-icons/font/weathericons-regular-webfont.eot'
import 'weather-icons/font/weathericons-regular-webfont.svg'
import 'weather-icons/font/weathericons-regular-webfont.ttf'
import 'weather-icons/font/weathericons-regular-webfont.woff'
import 'v-toaster/dist/v-toaster.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueGeolocation)
Vue.use(VueAxios, axios)
Vue.use(VueMoment)
Vue.use(Toaster, {timeout: 4000})

let app

// these are the credentials for Firebase
var config = {
  apiKey: "AIzaSyAY6yw84HasTRSsje6ugxEc-RhP5_De070",
  authDomain: "weather-app-e8911.firebaseapp.com",
  databaseURL: "https://weather-app-e8911.firebaseio.com",
  projectId: "weather-app-e8911",
  storageBucket: "",
  messagingSenderId: "324796955991"
};

firebase.initializeApp(config)

firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    // initialize the app after firebase has been loaded to avoid sync problems
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})