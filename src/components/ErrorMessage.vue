<template>
  <div class="error-message" role="alert">
    <i class="fas fa-circle-exclamation" aria-hidden="true"></i>
    <span>
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
};
</script>

<style scoped>
.error-message {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  color: var(--color-danger);
  background-color: var(--color-danger-bg);
  border-radius: var(--radius-md);
}
</style>
