<template>
    <div class="post md-elevation-12">
        <h4 class="post-title">{{post.title}}</h4>
        <div class="post-author">
            <router-link
                :to="{ name: 'userPage', params: { id: post.author._id} }"
            >
                <span>{{post.author.username}}</span>
                <img :src="static + post.author.avatarUrl" :alt="post.author.username">
            </router-link>
        </div>
        <div class="post-images">
            <img v-for="imgUrl in post.images" :src="static + imgUrl" :alt="post.title">
        </div>
    </div>
</template>

<script>

    export default {
        props: ['post', 'static']
    }
</script>

<style scoped>
    .post {
        width: 100%;
        margin: 40px 0;
        padding: 20px;
    }

    .post-title {
        font-size: 2vw;
        height: 2vw;
        display: flex;
        justify-content: start;
        align-items: center;
    }

    .post-author {
        display: flex;
        justify-content: center;
        flex-direction: column;
        width: 8vw;
        height: 10vw;
    }

    .post-author span {
        font-size: 1.3vw;
    }

    .post-author img {
        width: 100%;
    }

    .post-images {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
    }

    .post-images img {
        width: 100%;
        margin: 20px 0 0 0;
    }
</style>