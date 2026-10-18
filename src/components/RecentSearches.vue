<template>
  <section class="recent" aria-label="Recent searches">
    <ul class="recent-list">
      <li v-for="city in cities" :key="city" class="chip glass">
        <button type="button" class="chip-btn" :disabled="loading" @click="$emit('select', city)">
          <i class="fas fa-clock-rotate-left" aria-hidden="true"></i>
          {{ city }}
        </button>
        <button
          type="button"
          class="chip-remove"
          :aria-label="`Remove ${city}`"
          @click="$emit('remove', city)"
        >
          <i class="fas fa-xmark" aria-hidden="true"></i>
        </button>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "RecentSearches",
  props: {
    cities: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select", "remove"],
};
</script>

<style scoped>
.recent-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin: 0;
  padding: 0;
  list-style: none;
}

.chip {
  display: flex;
  align-items: center;
  border-radius: var(--radius-full);
}

.chip-btn,
.chip-remove {
  display: flex;
  align-items: center;
  color: inherit;
  background: transparent;
  border: none;
  cursor: pointer;
}

.chip-btn {
  gap: var(--space-2);
  padding: var(--space-1) var(--space-2) var(--space-1) var(--space-3);
  font-size: var(--font-size-sm);
}

.chip-btn .fas {
  color: var(--color-text-muted);
}

.chip-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.chip-remove {
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin-right: var(--space-1);
  color: var(--color-text-muted);
  border-radius: 50%;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.chip-remove:hover {
  color: var(--color-text);
  background-color: color-mix(in srgb, currentColor 12%, transparent);
}
</style>
