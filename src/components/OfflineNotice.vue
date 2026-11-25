<template>
  <div class="offline-notice glass">
    <i class="fas fa-wifi offline-icon" aria-hidden="true"></i>
    <span>
      You're offline. Showing saved weather for <strong>{{ city }}</strong> from {{ savedTime }}.
    </span>
  </div>
</template>

<script>
export default {
  name: "OfflineNotice",
  props: {
    city: {
      type: String,
      required: true,
    },
    savedAt: {
      type: Number,
      required: true,
    },
  },
  computed: {
    savedTime() {
      return new Intl.DateTimeFormat("en-GB", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(this.savedAt);
    },
  },
};
</script>

<style scoped>
.offline-notice {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  border-radius: var(--radius-md);
}

.offline-icon {
  color: var(--color-text-muted);
}
</style>
