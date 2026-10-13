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
    color: #c0392b;
    margin-top: 20px;
}

</style>