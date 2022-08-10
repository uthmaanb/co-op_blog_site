<template>
  <div class="post_page_container">
    <div class="create_post_container">
      <img src="" alt="" class="create_img" />
      <router-link :to="{ name: 'CreatePost' }" class="create_post_link"
        >Create a Post</router-link
      >
    </div>
    <div class="post_page" v-if="documents.length">
      <BlogPosts v-if="showPosts" :formattedDocuments="formattedDocuments" />
      <TagCloud :posts="documents" />
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection"
import BlogPosts from "@/components/BlogPosts.vue"
import { formatDistanceToNow } from "date-fns"
import { computed } from "@vue/reactivity"
import TagCloud from "@/components/TagCloud.vue"

export default {
  components: { BlogPosts, TagCloud },
  setup() {
    const { error, documents, showPosts } = getCollection("posts")

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate())
          return { ...doc, createdAt: time }
        })
      }
    })

    return { error, documents, formattedDocuments, showPosts }
  },
}
</script>

<style>
.post_page_container {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 200px 0 0 0;
  background: #f8f8f8;
}
.single_post_img {
  width: 100%;
  height: 75vh;
  -o-object-fit: cover;
  object-fit: contain;
  margin: 7px 0 0 0;
}
.post_page {
  width: 100%;
  display: flex;
  justify-content: center;
}
.post_title_container {
  text-decoration: none;
}
.create_post_container {
  display: flex;
  flex-direction: row;
  width: 26vw;
  margin: 0 0 25px 0;
  overflow: hidden;
}
a:hover {
  color: black;
  text-decoration: none;
}
.create_img {
  background: black;
  width: 65px;
  height: 65px;
  border-radius: 50px;
  border: none;
  margin: 0 20px 13px 30px;
}
.create_post_link {
  display: flex;
  align-items: flex-end;
  text-decoration: none;
  color: #515050;
  font-family: "Mukta", sans-serif;
  font-size: 20px;
  border-bottom: solid 1px black;
  padding: 0 0 15px 0;
  width: 45%;
  justify-content: flex-end;
}
</style>
