<template>
  <div class="error-message" role="alert">
    <slot />
  </div>
</template>

<script>
export default {
  name: "ErrorMessage",
};
</script>

<style scoped>
.error-message {
  margin-top: var(--space-5);
  color: var(--color-danger);
}
</style>
