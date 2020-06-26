<template>
  <section>
    <div class="text-warning mb-4">
      <h4>{{currentUser().displayName}}, {{ msg }}</h4>
    </div>

    <!-- Display the cards when the weather objects are available -->
    <div v-if="myWeather && weatherNy">
      <!-- Display two cards side by side, except on small screens, where they will be stacked -->
      <b-card-group deck class="mb-4">
        <!-- This card will display the local weather -->
        <b-card border-variant="success"
                text-variant="white"
                :header="getMyHeader"
                header-tag="h5"
                header-text-variant="primary"
                header-bg-variant="success"
                class="text-center"
                no-body>
            <keep-alive>
              <weather-table :weather="myWeather"></weather-table>
            </keep-alive>
            <b-card-body class="p-1 pt-2">
              <small v-if="myWeather.dt" class="text-success">Last checked: {{ myWeather.dt | moment("from") }}</small>
            </b-card-body>
        </b-card>

        <!-- This card will display the weather in NYC -->
        <b-card border-variant="info"
                text-variant="white"
                :header="getNyHeader"
                header-tag="h5"
                header-bg-variant="info"
                header-text-variant="primary"
                class="text-center"
                no-body>
            <keep-alive>
              <weather-table :weather="weatherNy"></weather-table>
            </keep-alive>
            <b-card-body class="p-1 pt-2">
              <small v-if="weatherNy.dt" class="text-info">Last checked: {{ myWeather.dt | moment("from") }}</small>
            </b-card-body>
        </b-card>
      </b-card-group>

      <div>
        <!--<b-button v-if="myWeather && weatherNy" variant="primary" size="md" class="mb-3" @click="getWeatherForLocation" >Refresh</b-button>-->
      </div>

      <small>Weather provided by: <a class="text-warning" href="https://openweathermap.org/current" target="_blank">openweathermap.org</a></small>
    </div>
  </section>
</template>

<script>
import firebase from 'firebase'
import Vue from 'vue'
import WeatherTable from '@/components/WeatherTable'

Vue.use(require('vue-moment'))

/**
 * This component is the main (home) view, available after authentication.
 * It displays two main sections: the weather at the user's location (determinied automatically),
 * and the weather in New York City. Display is side-by-side for easy comparison.
 */
export default {
  name: 'Home',
  components: {
    WeatherTable
  },
  data () {
    return {
      msg: 'welcome to your Weather App',
      loading: true,
      coordinates: {},  // will store the local geo location (coordinates)
      weatherNy: {},    // will store the weather in NYC once obtained from the API
      myWeather: {}     // will store the local weather once obtained from the API
    }
  },
  methods: {
    currentUser: function() {
      return firebase.auth().currentUser
    },
    getWeatherForLocation: function() {
      console.log('Getting weather info')
      // get the geo location for the current user
      this.$getLocation()
      .then(coords => {
        this.coordinates = coords
      })
      // then get the NYC weather
      .then(() => {
        let nyApi = `${process.env.VUE_APP_WEATHER_API_URL}?id=${process.env.VUE_APP_NYC_ID}&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
        Vue.axios.get(nyApi).then(response => {
          this.weatherNy = response.data
        })
      })
      // then get the local weather
      .then(() => {
        let myApi = `${process.env.VUE_APP_WEATHER_API_URL}?lat=${this.coordinates.lat.toFixed(2)}&lon=${this.coordinates.lng.toFixed(2)}&appid=${process.env.VUE_APP_WEATHER_API_KEY}`
        Vue.axios.get(myApi).then(response => {
          this.myWeather = response.data
          this.loading = false
        })
      })
    }
  },
  computed: {
    // cache the title of the local weather until the data is obtained asynchronously
    getMyHeader: function() {
      if (this.loading || !this.myWeather) return 'Getting your data...'
      return this.myWeather.name + ' weather'
    },
    // cache the title of the NYC weather until the data is obtained asynchronously
    getNyHeader: function() {
      if (this.loading || !this.weatherNy) return 'Getting your data...'
      return this.weatherNy.name + ' weather'
    }
  },
  // run these when the component is created (call the APIs)
  created: function() {
    this.getWeatherForLocation()
  }
}
</script>

<!-- The "scoped" attribute limits CSS to this component only -->
<style scoped>
@media screen and (max-width: 575px) {
  /* Add some margin for the NYC card on small devices */
  .card:nth-child(2) {
    margin-top: 30px;
  }
}
</style>
