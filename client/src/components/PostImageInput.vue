<template>
    <div class="container-image md-elevation-4">
        <div class="input-container md-elevation-4" v-if="inputUsed">
            <label class="input-label" :for="'imageLoader-' + id">
                <i class="fas fa-paperclip"></i>
                <input type="file" :id="'imageLoader-' + id" name="imageLoader" @change="handleImage"/>
            </label>
        </div>
        <div class="img-preview">
            <canvas id="imageCanvas" ref="id" ></canvas>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex';
    
    export default {
        props: ['id'],
        data() {
            return {
                inputUsed: true,
            }
        },
        methods: {
            ...mapMutations(['PUSH_IMAGE']),
            async handleImage(e) {
                console.log(this.id)
                const canvas = this.$refs.id;
                const ctx = canvas.getContext('2d');
                let reader = new FileReader();
                reader.onload = async function (event) {
                    let img = new Image();
                    img.onload = function () {
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                    }
                    img.src = event.target.result;
                    const base64Response = await fetch(img.src),
                          blob = await base64Response.blob(),
                          imageType = blob.type.split('/').pop(),
                          image = {
                                name: 'image',
                                blob: blob,
                                type: imageType
                          }
                    console.log(image)
                    // this.PUSH_IMAGE(image);
                }
                reader.readAsDataURL(e.target.files[0]);
                this.inputUsed = false;
            }
        }
    }
</script>

<style scoped>
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
    .img-preview {
        width: 100%;
        height: 100%;
    }
    .input-container {
        width: 50px;
        height: 50px;
        position: absolute;
        border-radius: 50px;
    }
    .input-label {
        cursor: pointer;
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 18px;
    }
    input[type="file"] {
        display: none;
    }
</style>