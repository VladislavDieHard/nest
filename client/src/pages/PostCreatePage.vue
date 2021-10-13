<template>
    <post-create-form></post-create-form>
</template>

<script>

    import PostCreateForm from "../components/PostCreateForm";

    export default {
        components: {PostCreateForm},
    }
</script>

<style scoped>
    .container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        padding: 100px;
    }
</style>