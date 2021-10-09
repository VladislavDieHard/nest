<template>
   <div class="post-list">

   </div>
</template>

<script>
    export default {
        data() {
            return {
                auth: false
            }
        },
        created() {
            this.auth = localStorage.getItem('auth') !== null
        },
        methods: {
            changeUserState() {
                if (this.auth) {
                    localStorage.removeItem('auth')
                    this.$router.push({ name: 'main'})
                } else {
                    localStorage.setItem('auth', true)
                    this.auth = true
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>
