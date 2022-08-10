<template>
  <div class="filter-nav">
    <input type="text" v-model="filteredPosts" />
    <button @click="filterCollection">Filter</button>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { ref } from "@vue/reactivity";

export default {
  props: ["documents"],
  setup() {
    const { documents, error } = getCollection();
    const filteredPosts = ref("");
    const filterPost = ref([]);

    const filterCollection = () => {
      filterPost.value.push(() => {
        let newDocs = filteredPosts.value.includes();
      });
    };

    return { filterCollection, filteredPosts };
  },
};
</script>

<style></style>
