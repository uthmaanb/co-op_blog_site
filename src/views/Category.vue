<template>
  <!-- <Navbar /> -->
  <div>
    <div v-if="error">{{ error }}</div>
    <div v-if="documents.length">
      <BlogPosts :formattedDocuments="filteredPosts" />
    </div>
  </div>
</template>

<script>
import BlogPosts from "@/components/BlogPosts.vue"
import getCollection from "@/composables/getCollection"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"

export default {
  components: { BlogPosts, getCollection },
  setup() {
    const route = useRoute()
    const { error, documents } = getCollection("posts")
    const category = route.params.category
    const updated_category =
      category.charAt(0).toUpperCase() + category.slice(1)

    const filteredPosts = computed(() => {
      return documents.value.filter((p) =>
        p.category.includes(updated_category)
      )
    })

    return { error, documents, filteredPosts }
  },
}
</script>

<style></style>
