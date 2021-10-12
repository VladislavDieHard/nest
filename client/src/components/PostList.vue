<template>
   <div class="post-list">
      <post-item v-for="post in posts" :post="post" :static="urls.static"/>
   </div>
</template>

<script>
   import PostItem from './PostItem'

    export default {
       components: {PostItem},
       props: ['posts', 'urls'],
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
