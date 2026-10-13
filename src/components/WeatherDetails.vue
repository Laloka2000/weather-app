<template>
    <ul class="weather-details">
        <li v-for="item in details" :key="item.label" class="detail">
            <i class="fas" :class="item.icon"></i>
            <span class="detail-label">{{ item.label }}</span>
            <span class="detail-value">{{ item.value }}</span>
        </li>
    </ul>
</template>

<script>
export default {
    name: "WeatherDetails",
    props: {
        weather: {
            type: Object,
            required: true,
        },
    },
    computed: {
        details()
        {
            const { main, wind } = this.weather;
            return [
                { label: "Feels like", value: `${Math.round(main.feels_like)}°C`, icon: "fa-temperature-half" },
                { label: "Humidity", value: `${main.humidity}%`, icon: "fa-droplet" },
                { label: "Wind", value: `${wind.speed} m/s`, icon: "fa-wind" },
                { label: "Pressure", value: `${main.pressure} hPa`, icon: "fa-gauge" },
            ];
        },
    },
};
</script>

<style scoped>

.weather-details {
    list-style: none;
    padding: 0;
    margin: 20px 0 0;
}

.detail {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1em;
    margin: 6px 0;
}

.detail .fas {
    color: #2980b9;
    width: 20px;
}

.detail-value {
    margin-left: auto;
    font-weight: 600;
}

</style>