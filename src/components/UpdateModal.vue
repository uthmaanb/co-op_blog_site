<template>
	<div v-show="props.modalActive" class="bg">
		<div v-show="props.modalActive" class="modal-dialog">
			<slot></slot>
		</div>
	</div>
</template>

<script>
export default {
	props: ["modalActive"],
	setup(props) {
		console.log("prop", props.modalActive);

		return { props };
	},
};
</script>

<style>
.bg {
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%; /* Full width */
	height: 100%; /* Full height */
	overflow: auto; /* Enable scroll if needed */
	background-color: rgb(0, 0, 0); /* Fallback color */
	background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
}
</style>
