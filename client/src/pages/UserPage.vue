<template>
    <div class="container">
        <div class="user-desc">
            <div class="user-info md-elevation-8">
                <h2 class="username">Username: {{user.username}}</h2>
                <img :src="urls.static + user.avatarUrl" :alt="user.username">
            </div>
        </div>
        <div class="user-posts">
            <post-list v-if="postExists" :posts="userPosts" :urls="urls"/>
            <h1 class="no-posts" v-else>У пользователя {{user.username}} пока-что нет постов 😩</h1>
        </div>
    </div>
</template>

<script>
    import PostList from "../components/PostList";
    import {mapGetters} from "vuex";


    export default {
        components: { PostList },
        data() {
            return {
                user: Object,
                userPosts: Array,
                postExists: false
            }
        },
        async beforeMount() {
            this.user = await this.getUser()
            this.userPosts = await this.getPosts(this.user._id);
        },
        computed: {
            ...mapGetters(['getUrls']),
            urls() {
                return this.getUrls
            }
        },
        methods: {
            async getUser() {
                return await this.axios
                    .get(this.urls.api + '/users/' + this.$route.params.id)
                    .then(response => {return response.data})
                    .catch(e => console.error(e));
            },

            async getPosts(userId) {
                const baseUrl = `/posts/user/${userId}`;
                return this.axios
                    .get(this.urls.api + baseUrl)
                    .then(response => {
                        if (response.data.length === 0) {
                            this.postExists = false;
                            return response.data;
                        } else {
                            this.postExists = true;
                            return response.data
                        }
                    })
            }
        }
    }
</script>

<style scoped>
    .container {
        display: flex;
    }

    .user-desc {
        width: 35%;
        padding: 20px 3vw;
    }

    .user-info {
        margin: 20px auto 0 auto;
        padding: 2vw;
    }

    .user-posts {
        width: 65%;
    }

    .no-posts {
        font-size: 34px;
        margin: 15vw 0;
        text-align: center;
    }
</style>