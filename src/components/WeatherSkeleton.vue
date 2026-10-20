<template>
  <div class="skeleton-layout" aria-hidden="true">
    <div class="skeleton-hero glass">
      <span class="bone bone--title"></span>
      <span class="bone bone--text"></span>
      <span class="bone bone--temp"></span>
      <span class="bone bone--text"></span>
    </div>

    <div class="skeleton-side">
      <ul class="skeleton-tiles">
        <li v-for="n in 6" :key="n" class="skeleton-tile glass">
          <span class="bone bone--label"></span>
          <span class="bone bone--value"></span>
        </li>
      </ul>
      <div class="skeleton-forecast glass">
        <span v-for="n in 5" :key="n" class="bone bone--row"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WeatherSkeleton",
};
</script>

<style scoped>
.skeleton-layout {
  display: grid;
  gap: var(--space-4);
}

.skeleton-side {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.skeleton-hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-6);
  border-radius: var(--radius-xl);
}

.skeleton-tiles {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: var(--space-3);
  margin: 0;
  padding: 0;
  list-style: none;
}

.skeleton-tile {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-lg);
}

.skeleton-forecast {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-lg);
}

.bone {
  position: relative;
  display: block;
  overflow: hidden;
  height: 1rem;
  background: color-mix(in srgb, currentColor 15%, transparent);
  border-radius: var(--radius-sm);
}

.bone::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    color-mix(in srgb, currentColor 15%, transparent),
    transparent
  );
  transform: translateX(-100%);
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes shimmer {
  to {
    transform: translateX(100%);
  }
}

.bone--title {
  width: 50%;
  height: 1.5rem;
}

.bone--text {
  width: 35%;
}

.bone--temp {
  width: 40%;
  height: 5rem;
  margin: var(--space-2) 0;
  border-radius: var(--radius-lg);
}

.bone--label {
  width: 60%;
  height: 0.75rem;
}

.bone--value {
  width: 45%;
  height: 1.5rem;
}

.bone--row {
  height: 1.75rem;
}

@media (min-width: 768px) {
  .skeleton-layout {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    align-items: start;
  }
}
</style>
