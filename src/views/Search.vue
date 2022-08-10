<template>
  <!-- <Navbar /> -->
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-if="documents.length">
      <BlogPosts :formattedDocuments="searchedPosts" />
    </div>
  </div>
</template>

<script>
import BlogPosts from "@/components/BlogPosts.vue"
import getCollection from "@/composables/getCollection"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"

export default {
  components: { BlogPosts },
  setup() {
    const route = useRoute()
    const { error, documents } = getCollection("posts")
    const search = route.params.search
    // const updated_category =
    //   category.charAt(0).toUpperCase() + category.slice(1)

    const searchedPosts = computed(() => {
      return documents.value.filter((p) => p.title.includes(search))
    })

    return { error, documents, searchedPosts }
  },
}
</script>

<style></style>
