<template>
  <section class="empty-state">
    <i class="fas fa-earth-europe empty-icon" aria-hidden="true"></i>
    <h2 class="empty-title">Search for a city</h2>
    <p class="empty-text">Type a city name above or use your location to see the weather.</p>
  </section>
</template>

<script>
export default {
  name: "EmptyState",
};
</script>

<style scoped>
.empty-state {
  padding: var(--space-8) var(--space-4);
  text-align: center;
  color: var(--color-text-muted);
}

.empty-icon {
  font-size: 3rem;
  color: var(--color-accent);
  margin-bottom: var(--space-4);
}

.empty-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-medium);
  color: var(--color-heading);
}

.empty-text {
  margin-top: var(--space-2);
}
</style>
