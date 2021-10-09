<template>
    <div class="films-page container">
        <h2>Выбери фильм на свой вкус</h2>
        <post-list :films="films" />
    </div>
</template>

<script>
    import PostList from "../components/PostList";


    export default {
        components: { PostList },
        data() {
            return {
                posts
            }
        },
        async mounted() {
            let response = await fetch('http://localhost:5000/posts', {
                'POST',
                ''
            });
        }
    }
</script>

<style lang="scss" scoped>
    h2 {
        font-size: 40px;
        color:#ffffff;
        margin-bottom: 30px;
    }
</style>