<template>
	<form class="create_post" @submit.prevent="handlePost">
		<h4>Create Blog Post</h4>
		<input type="text" placeholder="Title" v-model="title" required />
		<textarea placeholder="Content..." v-model="content" required></textarea>
		<select v-model="category" required>
			<option selected disabled>Select A Category</option>
			<option>Lifestyle</option>
			<option>Health</option>
			<option>Travel</option>
			<option>Music</option>
		</select>
		<input
			type="text"
			placeholder="Enter tags here(press enter to add tag)"
			v-model="tag"
			@keydown.enter.prevent="handleKey"
		/>
		<label>Upload Banner Image</label>
		<input @change="handleImage" type="file" />
		<div class="error">{{ fileError }}</div>

		<button>Create Post</button>
	</form>

	<div class="error"></div>
</template>

<script>
import { ref } from "@vue/reactivity";
import useStorage from "@/composables/useStorage";
import useCollection from "@/composables/useCollection";
import getUsers from "@/composables/getUsers";
import { timestamp } from "@/firebase/config";

export default {
	setup() {
		const { filePath, url, uploadImage } = useStorage();
		const { error, addDoc } = useCollection("posts");
		const { user } = getUsers();

		const title = ref("");
		const content = ref("");
		const tag = ref("");
		const tags = ref([]);
		const category = ref("");
		const file = ref(null);
		const fileError = ref(null);

		const handlePost = async () => {
			if (file.value) {
				await uploadImage(file.value, "banners");
				console.log("image uploade, url:" + url.value);
				await addDoc({
					title: title.value,
					content: content.value,
					tags: tags.value,
					category: category.value,
					userId: user.value.uid,
					userName: user.value.displayName,
					coverUrl: url.value,
					filePath: filePath.value,
					createdAt: timestamp(),
				});
				if (!error.value) {
					console.log("post added");
				}
			}
		};

		// allowed file types
		const types = ["image/png", "image/jpeg"];

		const handleImage = (e) => {
			const selected = e.target.files[0];
			console.log(selected);

			if (selected && types.includes(selected.type)) {
				file.value = selected;
				fileError.value = null;
			} else {
				file.value = null;
				fileError.value = "Please select an image file(png or jpg)";
			}
		};

		// add tag to tags
		const handleKey = () => {
			if (!tags.value.includes(tag.value)) {
				tag.value = tag.value.replace(/\s/, "");
				tags.value.push(tag.value);
			}
			tag.value = "";
		};

		return {
			title,
			content,
			tag,
			tags,
			category,
			handlePost,
			handleImage,
			handleKey,
			fileError,
		};
	},
};
</script>

<style>
form {
	background: #fff;
}
input[type="file"] {
	border: 0;
	padding: 0;
}
label {
	font-size: 12px;
	display: block;
	margin-top: 30px;
}
button {
	margin-top: 20px;
}
.create_post {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: column;
}
</style>
