<template>
  <div>
    <div v-for="doc in formattedDocuments" :key="doc">
      <SinglePosts :doc="doc" />
    </div>
  </div>
</template>

<script>
import SinglePosts from "./SinglePosts.vue";

export default {
  props: ["formattedDocuments"],
  components: { SinglePosts },
  setup(props) {},
};
</script>

<style></style>
