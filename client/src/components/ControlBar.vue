<template>
    <div class="control-bar md-elevation-12">

    </div>
</template>

<script>
    import PostList from "../components/PostList";


    export default {
        components: { PostList,  },
        data() {
            return {
                posts: Array,
                pageNum: this.$route.params.pageNum,
                params: {
                    limit: 10,
                    offset: 0
                },
                urls: {
                    apiStatic: 'http://localhost:5000/',
                    apiUrl: 'http://localhost:5000/api'
                }
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .control-bar {
        position: sticky;
        top: 20px;
        margin: calc(5vw + 24px) auto;
        width: 80%;
        height: 500px;
    }
</style>