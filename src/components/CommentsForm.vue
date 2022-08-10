<template>
	<form>
		<textarea
			placeholder="Comment Section and hit enter to send"
			v-model="message"
			@keypress.enter.prevent="handleSubmit"
		></textarea>
	</form>
</template>

<script>
import { ref } from "vue";
import getUsers from "@/composables/getUsers";
import { timestamp } from "@/firebase/config";
import useCollection from "@/composables/useCollection";
import getCollection from "@/composables/getCollection";

export default {
	props: ["doc"],
	setup(props) {
		console.log(props.doc);
		const message = ref("");
		const { user } = getUsers();
		const { addDoc, error } = useCollection("comments");
		const { documents } = getCollection("posts");

		const handleSubmit = async () => {
			const chat = {
				name: user.value.displayName,
				comment: message.value,
				createdAt: timestamp(),
				postId: props.doc,
			};

			await addDoc(chat);
			if (!error.value) {
				message.value = "";
			}
		};
		return { message, handleSubmit, error };
	},
};
</script>

<style></style>
