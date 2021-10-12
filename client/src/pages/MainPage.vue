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
    import {mapGetters, mapActions} from "vuex";


    export default {
        components: { PostList, ControlBar },
        data() {
            return {
                postsCount: null,
                pageNum: this.$route.params.pageNum,
                params: {
                    limit: 10,
                    offset: 0
                }
            }
        },
        async beforeMount() {
            await this.getData()
            // console.log(this.computed)
            // if (posts !== undefined) {
            //
            // }
        },
        computed: {
            ...mapGetters(['getUrls', 'getPosts']),
            urls() {
                return this.getUrls
            },
            posts() {
                return this.getPosts
            }
        },
        methods: {
            ...mapActions(['downloadPosts']),
            async getData() {
                await this.downloadPosts();
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