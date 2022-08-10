<template>
	<div class="post_container">
		<div class="user_details">
			<img :src="user.photoUrl" alt="" class="user_img" />
			<p class="user_name style">{{ doc.userName }}</p>
		</div>
		<img class="single_post_img" :src="doc.coverUrl" />
		<div class="post_info">
			<span class="post_time">
				<p class="time">{{ doc.createdAt }} ago</p>
			</span>
			<router-link
				:to="{ name: 'SinglePost', params: { id: doc.id } }"
				class="post_title_container"
			>
				<div class="post_heading">
					<h3 class="post_title style">{{ doc.title }}</h3>
				</div>
			</router-link>
			<p class="style">{{ snippet }}</p>
			<div class="tags">
				<div v-for="tag in doc.tags" :key="tag">
					<p class="tag style"># {{ tag }} ,</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { computed } from "@vue/reactivity";
import getUsers from "@/composables/getUsers";

export default {
	props: ["doc"],
	setup(props) {
		const { user } = getUsers();
		console.log(user);
		const snippet = computed(() => {
			return props.doc.content.substring(0, 25) + "...";
		});

		return { snippet, user };
	},
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Barlow:wght@300;700&family=Mukta:wght@300&display=swap");
.post_container {
	width: 90vw;
	height: 100%;
	margin: 0 0 80px 0;
	background: black;
}
.post_info {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.post_time {
	height: 100px;
	width: 100px;
	background-color: #f8f8f8;
	border-radius: 50%;
	display: flex;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	margin: -50px 0 0 0;
	border: solid 1px black;
}
.time {
	width: 90%;
	font-family: "Mukta", sans-serif;
	color: black;
	font-weight: 600;
}
.post_title {
	font-weight: 900;
}
.style {
	font-family: "Mukta", sans-serif;
	color: #ffffff;
}
.user_details {
	display: flex;
	flex-direction: row;
	align-items: flex-end;
}
.user_img {
	width: 65px;
	height: 65px;
	background: #ffffff;
	border-radius: 50px;
	border: none;
	margin: 6px 30px 0 20px;
}
.user_name {
	font-size: 22px;
}
.tags {
	display: flex;
	flex-direction: row;
	margin: -16px 0 0 0;
}
</style>
