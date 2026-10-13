<template>
  <form class="search-container" @submit.prevent="onSubmit">
    <input v-model="city" class="city-input" placeholder="Enter city name" aria-label="City name" />
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
  data() {
    return {
      city: "",
    };
  },
  methods: {
    onSubmit() {
      this.$emit("search", this.city.trim());
    },
  },
};
</script>

<style scoped>
.search-container {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-5);
}

.city-input {
  flex: 1;
  min-width: 0;
  padding: var(--space-3);
  border: 2px solid var(--color-border);
  border-radius: var(--radius-sm);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.city-input:focus-visible {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-focus-ring);
}

.search-btn {
  padding: var(--space-3) var(--space-5);
  font-weight: var(--font-weight-medium);
  color: var(--color-on-primary);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background-color var(--transition-base);
}

.search-btn:hover:not(:disabled) {
  background-color: var(--color-primary-hover);
}

.search-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
