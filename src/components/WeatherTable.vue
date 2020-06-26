<template>
    <div>
        <b-list-group flush v-if="weather.weather">
            <b-list-group-item variant="" class="d-flex justify-content-between align-items-center pt-0 pb-0">
                <span>Sky conditions:</span>
                <img :src="getIconSrc(weather.weather[0].icon)">
                <span>{{weather.weather[0].description | capitalize}}</span>
            </b-list-group-item>

            <b-list-group-item variant="primary" class="d-flex justify-content-between align-items-center">
                <span>Temperature:</span>
                <span>{{weather.main.temp | temperature}}</span>
            </b-list-group-item>

            <b-list-group-item variant="" class="d-flex justify-content-between align-items-center">
                <span>Pressure:</span>
                <span>{{weather.main.pressure}} hPa</span>
            </b-list-group-item>

            <b-list-group-item variant="primary" class="d-flex justify-content-between align-items-center">
                <span>Humidity:</span>
                <span>{{weather.main.humidity}}%</span>
            </b-list-group-item>

            <b-list-group-item variant="" class="d-flex justify-content-between align-items-center">
                <span>Visibility:</span>
                <span>{{weather.visibility | miles}}</span>
            </b-list-group-item>

            <b-list-group-item variant="primary" class="d-flex justify-content-between align-items-center">
                <span>Wind:</span>
                <span class="wi-md" v-html="getWindIcon(weather.wind.deg)"></span>
                <span>{{weather.wind.speed}}mps</span>
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
/**
 * This component will display the weather details inside a card, in a table-like manner.
 * Each "row" is a major component of the weather data: temperature, sky conditions, pressure, humidity, visibility, wind speed and direction.
 */
export default {
    name: 'WeatherTable',
    props: ['weather'],
    filters: {
        // filter to capitalize the sentence
        capitalize: function (value) {
            if (!value) return ''
            value = value.toString()
            return value.charAt(0).toUpperCase() + value.slice(1)
        },
        // filter to convert temperature from K to °C and F
        temperature: function(value) {
            if (!value) return ''
            let temp = value - 273.15;
            let f = temp * 9 / 5 + 32;
            temp = temp.toFixed(0)
            f = f.toFixed(0)
            return `${f}°F (${temp}°C)`
        },
        // filter to display an icon for the wind direction
        wind: function(deg) {
            deg = deg || 0
            return `<i class="wi wi-wind from-${deg}-deg"></i>`
        },
        // filter to convert visibility from m to miles
        miles: function(value) {
            if (!value) return ''
            let miles = (value / 1609).toFixed(1)
            return `${miles} miles`
        }
    },
    methods: {
        // retrieve the icon for the sky conditions from the weather API
        getIconSrc: function(base) {
            let src = `https://openweathermap.org/img/w/${base}.png`
            return src
        },
        // build the wind direction icon dynamically based on the latest data
        getWindIcon: function(deg) {
            deg = deg || 0
            deg = deg.toFixed(0)
            let icon = `<i class="wi wi-wind from-${deg}-deg"></i>`
            return icon
        }
    }
}
</script>

<!-- The "scoped" attribute limits CSS to this component only -->
<style scoped>
.wi-md {
    font-size: 1.5em;
    font-weight: normal;
    line-height: 1em;
}
.list-group-item-primary:hover {
    background-color: #f1f1e1;
}
</style>
