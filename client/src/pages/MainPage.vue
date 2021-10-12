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
    import {mapGetters} from "vuex";


    export default {
        components: { PostList, ControlBar },
        data() {
            return {
                posts: Array,
                pageNum: this.$route.params.pageNum,
                params: {
                    limit: 10,
                    offset: 0
                }
            }
        },
        computed: {
            ...mapGetters(['getUrls']),
            urls() {
                return this.getUrls
            }
        },
        async mounted() {
            await this.getPosts();
            // console.log(process.env.VUE_APP_CONFIG_WORK)
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
                    .get(this.urls.api + baseUrl + '?' + qs)
                    .then(response => {this.posts = response.data});
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