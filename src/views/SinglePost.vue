<template>
	<div v-if="error">{{ error }}</div>
	<div class="view_post_container" v-if="post">
		<router-link :to="{ name: 'ViewPost' }" class="arrow_container">
			<i class="fas fa-arrow-left back_arrow"></i>
		</router-link>
		<h3>{{ post.title }}</h3>
		<img :src="post.coverUrl" />
		<p>{{ post.content }}</p>
	</div>
	<button v-if="ownership" @click="handleDelete">Delete Post</button>
	<button @click="toggleModal">Update Post</button>
	<UpdateModal :modalActive="modalActive">
		<div class="modal-content">
			<form>
				<h1>Hello</h1>
				<input type="text" />
				<input type="text" />
				<input type="text" />
				<select>
					<option></option>
					<option></option>
					<option></option>
					<option></option>
				</select>
				<button>Update</button>
				<button @click.prevent="toggleModal">Close</button>
			</form>
		</div>
	</UpdateModal>
	<CommentsWindow :doc="props.id" />
	<CommentsForm :doc="props.id" />
</template>

<script>
import { useRouter } from "vue-router";
import useSingleCollection from "@/composables/useSingleCollection";
import getSingleCollection from "@/composables/getSingleCollection";
import getUsers from "@/composables/getUsers";
import useStorage from "@/composables/useStorage";
import CommentsForm from "@/components/CommentsForm.vue";
import UpdateModal from "../components/UpdateModal.vue";
import { computed, ref } from "@vue/reactivity";
import CommentsWindow from "@/components/CommentsWindow.vue";

export default {
	props: ["id", "posts"],
	components: { CommentsForm, CommentsWindow, UpdateModal },
	setup(props) {
		const { error, post } = getSingleCollection("posts", props.id);
		const { user } = getUsers();
		const { deleteImage } = useStorage();
		const { delDoc, updateDoc } = useSingleCollection("posts", props.id);
		const router = useRouter();
		let modalActive = ref(false);

		const ownership = computed(() => {
			return post.value && user.value && user.value.uid == post.value.userId;
		});

		const handleDelete = async () => {
			await deleteImage(post.value.filePath);
			await delDoc();
			router.push("/posts");
		};

		const handleUpdate = async () => {
			await updateDoc({});
		};

		const toggleModal = () => {
			modalActive.value = !modalActive.value;
			console.log(modalActive.value);
		};

		console.log(props.id);

		return {
			error,
			post,
			ownership,
			handleDelete,
			props,
			modalActive,
			toggleModal,
		};
	},
};
</script>

<style>
.view_post_container {
	margin: 156px 0 0 0;
}
.arrow_container {
	text-decoration: none;
}
.back_arrow {
	display: flex;
	margin: 0 0 0 40px;
	padding: 15px 0 0 0;
	font-size: 31px;
	text-decoration: none;
	position: fixed;
}
</style>
