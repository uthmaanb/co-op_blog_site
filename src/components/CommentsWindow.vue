<template>
	<div>
		<div v-if="error">
			{{ error }}
		</div>
		<div v-if="documents" class="messages" ref="messages">
			<div v-for="doc in formattedDocuments" :key="doc.id">
				<div v-if="doc.postId === props.doc">
					<span>{{ doc.createdAt }}</span>
					<span>{{ doc.name }}</span>
					<span>{{ doc.comment }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";
export default {
	props: ["doc"],
	setup(props) {
		const { error, documents } = getCollection("comments");

		const formattedDocuments = computed(() => {
			if (documents.value) {
				console.log(documents.value);
				return documents.value.map((doc) => {
					const time = formatDistanceToNow(doc.createdAt.toDate());

					return { ...doc, createdAt: time };
				});
			}
		});

		// auto-scroll to bottom of messages
		const messages = ref("");

		onUpdated(() => {
			messages.value.scrollTop = messages.value.scrollHeight;
		});

		return { error, documents, formattedDocuments, messages, props };
	},
};
</script>

<style></style>
