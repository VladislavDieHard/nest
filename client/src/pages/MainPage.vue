<template>
    <div class="container">
        <div class="posts">
            <h2>Посты</h2>
            <post-list :posts="posts" :urls="urls" />
        </div>
        <div class="control-bar-container">
            <control-bar></control-bar>
        </div>
    </div>
</template>

<script>
    import PostList from "../components/PostList";
    import ControlBar from "../components/ControlBar";


    export default {
        components: { PostList, ControlBar },
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
    .container {
        display: flex;
        margin-top: 5vw;
    }

    .posts {
        width: 65%;
    }

    .control-bar-container {
        width: 35%;
        position: relative;
    }

    h2 {
        color: #202020;
        height: 4vw;
        padding: 0 25%;
        display: flex;
        align-items: center;
        font-size: 3vw;
    }
</style>