<template>
    <div class="control-bar md-elevation-12">
        <div class="page-switch">
            <md-button class="md-icon-button md-raised">
                <md-icon>chevron_left</md-icon>
                <md-tooltip md-direction="top">Предыдущая страница</md-tooltip>
            </md-button>
            <md-content class="md-elevation-2 page-counter">{{currentPage}}/{{pages}}</md-content>
            <md-button class="md-icon-button md-raised">
                <md-icon>chevron_right</md-icon>
                <md-tooltip md-direction="top">Следующая страница</md-tooltip>
            </md-button>
        </div>
        <button @click="show">Show</button>
    </div>
</template>

<script>
    import PostList from "../components/PostList";
    import { mapGetters } from 'vuex';


    export default {
        components: { PostList },
        data() {
            return {
                currentPage: 1,
                newOffset: null,
                newLimit: null
            }
        },
        computed: {
            ...mapGetters(['getLimit', 'getOffset', 'getCount']),
            limit() {
                return this.getLimit;
            },
            offset() {
                return this.getOffset;
            },
            pages() {
                return Math.ceil(this.getCount / this.limit);
            }
        },
        async mounted() {
            this.postsCount = this.count
        },
        methods: {
            show() {
                console.log(this.limit)
                console.log(this.offset)
                console.log(this.newLimit)
            }
        }
    }
</script>

<style scoped>
    .control-bar {
        position: sticky;
        top: 20px;
        margin: calc(5vw + 24px) auto;
        padding: 1.5vw;
        width: 80%;
        height: 500px;
    }

    .posts-limit-select {
        width: 80%;
    }

    .page-switch {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .page-counter {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
</style>