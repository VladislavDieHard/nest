<template>
    <div class="post">
        <h4 class="post-title">{{post.title}}</h4>
        <div class="post-author">
            <span>{{post.author.username}}</span>
            <img :src="static + post.author.avatarUrl" :alt="post.author.username">
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
        width: 400px;
        margin: 40px 0;
    }

    .post-title {
        font-size: 3vw;
    }

    .post-author {
        width: 20%;
    }

    .post-author img {
        width: 50px;
    }

    .post-images {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
    }

    .post-images img {
        width: 50%;
    }
</style>