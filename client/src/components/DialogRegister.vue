<template>
    <div>
        <md-dialog :md-active.sync="showDialog">
            <md-dialog-title>Preferences</md-dialog-title>



            <md-dialog-actions>
                <md-button class="md-primary" @click="showDialog = false">Close</md-button>
                <md-button class="md-primary" @click="showDialog = false">Save</md-button>
            </md-dialog-actions>
        </md-dialog>
        <md-button class="md-accent" @click="showDialog = true">Зарегистрироваться</md-button>
    </div>
</template>

<script>
    export default {
        name: 'DialogRegister',
        data() {
            return {
                showDialog: false
            }
        }
    }
</script>

<style scoped>
    /* .md-dialog /deep/.md-dialog-container {
      max-width: 768px;
    } */
</style>
