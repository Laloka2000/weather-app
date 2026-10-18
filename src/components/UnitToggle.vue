<template>
  <div class="unit-toggle glass" role="group" aria-label="Temperature unit">
    <button
      v-for="unit in units"
      :key="unit"
      type="button"
      class="unit-btn"
      :class="{ 'is-active': unit === modelValue }"
      :aria-pressed="unit === modelValue"
      @click="$emit('update:modelValue', unit)"
    >
      °{{ unit }}
    </button>
  </div>
</template>

<script>
import { UNITS } from "@/utils/units";

export default {
  name: "UnitToggle",
  props: {
    modelValue: {
      type: String,
      required: true,
      validator: (value) => UNITS.includes(value),
    },
  },
  emits: ["update:modelValue"],
  data() {
    return {
      units: UNITS,
    };
  },
};
</script>

<style scoped>
.unit-toggle {
  display: flex;
  flex-shrink: 0;
  padding: var(--space-1);
  border-radius: var(--radius-full);
}

.unit-btn {
  min-width: 2.75rem;
  padding: var(--space-1) var(--space-3);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-muted);
  background: transparent;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition:
    color var(--transition-fast),
    background-color var(--transition-fast);
}

.unit-btn:hover:not(.is-active) {
  color: var(--color-text);
}

.unit-btn.is-active {
  color: var(--color-on-primary);
  background-color: var(--color-primary);
}
</style>
