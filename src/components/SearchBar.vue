<template>
  <div class="search">
    <form class="search-container glass" role="search" @submit.prevent="onSubmit">
      <i class="fas fa-magnifying-glass search-icon" aria-hidden="true"></i>
      <input
        v-model="city"
        type="search"
        class="city-input"
        placeholder="Enter city name"
        aria-label="City name"
        autocomplete="off"
        spellcheck="false"
        enterkeyhint="search"
        role="combobox"
        aria-autocomplete="list"
        aria-controls="city-suggestions"
        :aria-expanded="isOpen"
        :aria-activedescendant="activeOptionId"
        @input="onInput"
        @focus="open = true"
        @blur="closeSuggestions"
        @keydown.down.prevent="moveActive(1)"
        @keydown.up.prevent="moveActive(-1)"
        @keydown.esc="onEscape"
      />
      <button
        type="button"
        class="locate-btn"
        :disabled="loading"
        aria-label="Use my location"
        title="Use my location"
        @click="$emit('locate')"
      >
        <i class="fas fa-location-crosshairs" aria-hidden="true"></i>
      </button>
      <button type="submit" :disabled="loading" class="search-btn">
        <i v-if="loading" class="fas fa-spinner fa-spin" aria-hidden="true"></i>
        {{ loading ? "Loading..." : "Get Weather" }}
      </button>
    </form>

    <ul
      v-show="isOpen"
      id="city-suggestions"
      class="suggestions glass"
      role="listbox"
      aria-label="City suggestions"
    >
      <li
        v-for="(place, index) in suggestions"
        :id="`city-option-${index}`"
        :key="place.id"
        class="suggestion"
        :class="{ 'is-active': index === activeIndex }"
        role="option"
        :aria-selected="index === activeIndex"
        @mousedown.prevent="selectPlace(place)"
        @mouseenter="activeIndex = index"
      >
        <span class="suggestion-name">{{ place.name }}</span>
        <span class="suggestion-region">{{ place.region }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { searchCities } from "@/services/geocoding";

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 300;

export default {
  name: "SearchBar",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["search", "select", "locate"],
  data() {
    return {
      city: "",
      suggestions: [],
      activeIndex: -1,
      open: false,
    };
  },
  computed: {
    isOpen() {
      return this.open && this.suggestions.length > 0;
    },
    activeOptionId() {
      return this.activeIndex >= 0 ? `city-option-${this.activeIndex}` : null;
    },
  },
  beforeUnmount() {
    this.cancelPending();
  },
  methods: {
    onInput() {
      this.cancelPending();
      const query = this.city.trim();

      if (query.length < MIN_QUERY_LENGTH) {
        this.resetSuggestions();
        return;
      }

      this.debounceTimer = setTimeout(() => this.fetchSuggestions(query), DEBOUNCE_MS);
    },

    async fetchSuggestions(query) {
      this.controller = new AbortController();

      try {
        this.suggestions = await searchCities(query, { signal: this.controller.signal });
        this.activeIndex = -1;
        this.open = true;
      } catch (err) {
        if (err.name !== "AbortError") this.resetSuggestions();
      }
    },

    cancelPending() {
      clearTimeout(this.debounceTimer);
      if (this.controller) this.controller.abort();
    },

    resetSuggestions() {
      this.suggestions = [];
      this.activeIndex = -1;
    },

    closeSuggestions() {
      this.open = false;
      this.activeIndex = -1;
    },

    moveActive(step) {
      if (!this.suggestions.length) return;

      this.open = true;
      const count = this.suggestions.length;
      const start = this.activeIndex === -1 && step < 0 ? 0 : this.activeIndex;
      this.activeIndex = (start + step + count) % count;
    },

    onEscape(event) {
      if (!this.isOpen) return;
      event.preventDefault();
      this.closeSuggestions();
    },

    selectPlace(place) {
      this.city = place.name;
      this.cancelPending();
      this.resetSuggestions();
      this.closeSuggestions();
      this.$emit("select", place);
    },

    onSubmit() {
      if (this.isOpen && this.activeIndex >= 0) {
        this.selectPlace(this.suggestions[this.activeIndex]);
        return;
      }

      this.cancelPending();
      this.closeSuggestions();
      this.$emit("search", this.city.trim());
    },
  },
};
</script>

<style scoped>
.search {
  position: relative;
}

.locate-btn {
  display: grid;
  flex-shrink: 0;
  place-items: center;
  width: 36px;
  height: 36px;
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.locate-btn:hover:not(:disabled) {
  color: var(--color-text);
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.locate-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.search-container {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-1) var(--space-1) var(--space-1) var(--space-4);
  border-radius: var(--radius-full);
  transition: box-shadow var(--transition-fast);
}

.search-container:focus-within {
  box-shadow:
    0 0 0 3px var(--color-focus-ring),
    var(--glass-shadow);
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
  -webkit-appearance: none;
  appearance: none;
}

.city-input::placeholder {
  color: var(--color-text-muted);
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

.suggestions {
  position: absolute;
  top: calc(100% + var(--space-2));
  right: 0;
  left: 0;
  z-index: 10;
  margin: 0;
  padding: var(--space-1);
  list-style: none;
  background: var(--glass-bg-strong);
  border-radius: var(--radius-lg);
}

.suggestion {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  cursor: pointer;
}

.suggestion.is-active {
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}

.suggestion-name {
  font-weight: var(--font-weight-medium);
}

.suggestion-region {
  min-width: 0;
  overflow: hidden;
  font-size: var(--font-size-sm);
  color: var(--color-text-muted);
  text-align: right;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media (min-width: 768px) {
  .search {
    max-width: 420px;
  }
}
</style>
