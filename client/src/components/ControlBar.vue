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
                    .then(response => {this.posts = response.data; console.log(response.data)});

            }
        }
    }
</script>

<style scoped>
    .control-bar {
        top: 20px;
        margin: calc(5vw + 24px) auto;
        width: 80%;
        height: 500px;
    }
</style>