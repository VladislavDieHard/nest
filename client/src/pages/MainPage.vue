<template>
    <div class="posts container">
        <h2>Посты</h2>
        <post-list :posts="posts" :urls="urls" />

    </div>
</template>

<script>
    import PostList from "../components/PostList";


    export default {
        components: { PostList },
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
        async mounted() {
            await this.getPosts();
        },
        methods: {
            async switchPage() {

            },

            async getPosts() {
                const baseUrl = '/posts';
                const qs = Object.keys(this.params)
                    .map(key => `${key}=${this.params[key]}`)
                    .join('&');
                this.axios
                    .get(this.urls.apiUrl + baseUrl + '?' + qs)
                    .then(response => {this.posts = response.data; console.log(response.data)})

            }
        }
    }
</script>

<style scoped>
    h2 {
        font-size: 40px;
        color:#ffffff;
        margin-bottom: 30px;
    }
</style>