<template>
  <div class="tag">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents.length">
      <BlogPosts :formattedDocuments="postsWithTag" />
      <TagCloud :posts="documents" />
    </div>
  </div>
</template>

<script>
import BlogPosts from "@/components/BlogPosts.vue"
import getCollection from "@/composables/getCollection"
import TagCloud from "../components/TagCloud.vue"
import { useRoute } from "vue-router"
import { computed } from "@vue/reactivity"

export default {
  components: { BlogPosts, TagCloud },
  setup() {
    const route = useRoute()
    const { error, documents } = getCollection("posts")

    const postsWithTag = computed(() => {
      return documents.value.filter((p) => p.tags.includes(route.params.tag))
    })

    return { error, documents, postsWithTag }
  },
}
</script>

<style></style>
