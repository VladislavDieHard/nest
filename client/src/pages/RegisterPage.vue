<template>
    <div class="container">
        <h1>Регистрация</h1>
        <register-form></register-form>
    </div>
</template>

<script>
    import RegisterForm from "../components/RegisterForm";

    export default {
        components: {RegisterForm},
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