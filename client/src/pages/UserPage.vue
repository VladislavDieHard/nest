<template>
    <div class="container">
        <div class="user-desc">
            <div class="user-info md-elevation-8">
                <h2 class="username">Username: {{user.username}}</h2>
                <img :src="urls.apiStatic + user.avatarUrl" :alt="user.username">
            </div>
        </div>
        <div class="user-posts">
            <post-list :posts="userPosts" :urls="urls"/>
        </div>
    </div>
</template>

<script>
    import PostList from "../components/PostList";


    export default {
        components: { PostList },
        data() {
            return {
                user: Object,
                userPosts: Array,
                urls: {
                    apiStatic: 'http://localhost:5000/',
                    apiUrl: 'http://localhost:5000/api'
                }
            }
        },
        async created() {
            this.user = await this.getUser()
            this.userPosts = await this.getPosts(this.user._id);
        },
        methods: {
            async getUser() {
                return await this.axios
                    .get(this.urls.apiUrl + '/users/' + this.$route.params.id)
                    .then(response => {return response.data})
                    .catch(e => console.err(e));
            },

            async getPosts(userId) {
                const baseUrl = `/posts/user/${userId}`;
                return this.axios
                    .get(this.urls.apiUrl + baseUrl)
                    .then(response => {return response.data})
                    .catch(e => console.err(e));

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
</style>