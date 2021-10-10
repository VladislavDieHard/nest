<template>
   <div class="post-list">
      <post-item v-for="post in posts" :post="post" :static="urls.apiStatic"/>
   </div>
</template>

<script>
   import PostItem from './PostItem'

    export default {
       components: {PostItem},
       props: ['posts', 'urls'],
        data() {
            return {
                auth: false
            }
        },
        created() {
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

<style scoped>
   .post-list {
      width: 80%;
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
   }
</style>
