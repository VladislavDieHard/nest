<template>
    <div class="container">
        <form novalidate class="md-layout" @submit.prevent="validateUser">
            <md-card-header>
                <md-field class="title-input">
                    <label><i class="fas fa-pencil-alt"></i> Заголовок</label>
                    <md-input v-model="postTitle" maxlength="40"></md-input>
                </md-field>
            </md-card-header>
            <div class="images-container">
                <div class="image-place-item"
                     v-for="imagePlace in imagePlaces"
                     :id="imagePlace"
                >
                    <md-button class="md-icon-button remove-place-btn" @click="removeImagePlace(imagePlace)">
                        <md-icon>delete</md-icon>
                    </md-button>
                    <post-image-input
                            :id="imagePlace"
                    ></post-image-input>
                </div>
                <div class="container-image md-elevation-4">
                    <md-button class="md-icon-button" @click="addImagePlace">
                        <md-icon>add</md-icon>
                    </md-button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import PostImageInput from "./PostImageInput";

    export default {
        components: { PostImageInput },
        data() {
            return {
                postTitle: 'Мой новый пост!',
                imagePlaces: [1]
            }
        },
        methods: {
            addImagePlace() {
                const lastIndex = this.imagePlaces[this.imagePlaces.length - 1];
                if (this.imagePlaces.length < 10) {
                    this.imagePlaces.push(lastIndex + 1);
                }
            },

            removeImagePlace(id) {
                const newArr = [];
                this.imagePlaces.forEach(item => {
                    if (item !== id) {
                        newArr.push(item);
                    }
                });
                this.imagePlaces = newArr;
            }
        }
    }
</script>

<style scoped>
    form {
        display: flex;
        flex-direction: column;
    }
    .container {
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 100px;
    }
    .images-container {
        width: 1350px;
        display: flex;
        flex-wrap: wrap;
    }
    .container-image {
        width: 250px;
        height: 250px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        position: relative;
        padding: 15px;
        margin: 10px;
    }

    .title-input {
        width: 250px;
    }

    .image-place-item {
        position: relative;
    }

    .remove-place-btn {
        right: 8px;
        top: 14px;
        position: absolute;
    }
</style>