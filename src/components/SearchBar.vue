<template>
  <form class="search-container" role="search" @submit.prevent="onSubmit">
    <i class="fas fa-magnifying-glass search-icon" aria-hidden="true"></i>
    <input v-model="city" class="city-input" placeholder="Enter city name" aria-label="City name" />
    <button type="submit" :disabled="loading" class="search-btn">
      <i v-if="loading" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
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
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-4);
  background-color: var(--color-surface);
  border: 2px solid transparent;
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
  transition:
    border-color var(--transition-fast),
    box-shadow var(--transition-fast);
}

.search-container:focus-within {
  border-color: var(--color-primary);
  box-shadow:
    0 0 0 3px var(--color-focus-ring),
    var(--shadow-md);
}

.search-icon {
  color: var(--color-text-muted);
}

.city-input {
  flex: 1;
  min-width: 0;
  padding: var(--space-2) 0;
  background: transparent;
  border: none;
}

.city-input:focus-visible {
  outline: none;
}

.search-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-5);
  font-weight: var(--font-weight-medium);
  color: var(--color-on-primary);
  background-color: var(--color-primary);
  border: none;
  border-radius: var(--radius-full);
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

@media (min-width: 768px) {
  .search-container {
    max-width: 420px;
  }
}
</style>
