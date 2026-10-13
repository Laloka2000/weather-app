<template>
    <form class="search-container" @submit.prevent="onSubmit">
        <input 
            v-model="city"
            class="city-input"
            placeholder="Enter city name"
            aria-label="City name"
        />
        <button type="submit" :disabled="loading" class="search-btn">
            {{ loading ? "Loading..." : "Get Weather" }}
        </button>
    </form>
</template>

<script>
export default {
    name: "SearchBar",
    props: {
        loading: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["search"],
    data()
    {
        return {
            city: "",
        };
    },
    methods: {
        onSubmit()
        {
            this.$emit("search", this.city.trim());
        },
    },
};
</script>

<style scoped>
.search-container {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.city-input {
    padding: 10px;
    font-size: 1em;
    border: 2px solid #2c3e50;
    border-radius: 5px;
    outline: none;
    width: 70%;
}

.search-btn {
    padding: 10px 20px;
    font-size: 1em;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-left: 10px;
    transition: background-color 0.3s;
}

.search-btn:hover {
    background-color: #2980b9;
}

.search-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>