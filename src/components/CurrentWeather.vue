<template>
    <section class="current-weather">
        <h2 class="location">
            <i class="fas fa-location-dot"></i> {{ weather.name }}, {{ weather.sys.country }}
        </h2>
        <p class="temperature">{{ temperature }}°C</p>
        <p class="description">{{ weather.weather[0].description }}</p>
    </section>
</template>

<script>
export default {
    name: "CurrentWeather",
    props: {
        weather: {
            type: Object,
            required: true,
        },
    },
    computed: {
        temperature()
        {
            return Math.round(this.weather.main.temp);
        },
    },
};
</script>

<style scoped>
.current-weather {
    margin-top: 20px;
}

.location {
    font-size: 1.5em;
    color: #34495e;
}

.location .fas {
    color: #2980b9;
    margin-right: 5px;
}

.temperature {
    font-size: 3em;
    font-weight: 300;
    margin: 10px 0 0;
}

.description {
    text-transform: capitalize;
    margin-top: 0;
}
</style>