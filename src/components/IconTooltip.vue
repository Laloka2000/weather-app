<template>
  <span
    class="icon-tooltip"
    tabindex="0"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focus="visible = true"
    @blur="visible = false"
    @keydown.esc="visible = false"
  >
    <slot />
    <span class="tooltip" :class="{ 'is-visible': visible }" aria-hidden="true">
      {{ text }}
    </span>
  </span>
</template>

<script>
export default {
  name: "IconTooltip",
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
};
</script>

<style scoped>
.icon-tooltip {
  position: relative;
  display: inline-flex;
  border-radius: var(--radius-sm);
  cursor: help;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  z-index: 5;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  white-space: nowrap;
  text-transform: capitalize;
  color: var(--color-on-primary);
  background: var(--color-primary);
  background-clip: padding-box;
  border-bottom: var(--space-1) solid transparent;
  border-radius: var(--radius-sm);
  opacity: 0;
  transform: translate(-50%, 4px);
  pointer-events: none;
  transition:
    opacity var(--transition-fast),
    transform var(--transition-fast);
}

.tooltip.is-visible {
  opacity: 1;
  transform: translate(-50%, 0);
  pointer-events: auto;
}
</style>
