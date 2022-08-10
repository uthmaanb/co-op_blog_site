import { ref } from "vue";
import { projectFirestore } from "../firebase/config";
import { watchEffect } from "@vue/runtime-core";

const getSingleCollection = (collection, id) => {
	const post = ref(null);
	const error = ref(null);

	let documentRef = projectFirestore.collection(collection).doc(id);

	const unsub = documentRef.onSnapshot(
		(snap) => {
			if (snap.data()) {
				post.value = { ...snap.data(), id: snap.id };
				error.value = null;
			} else {
				error.value = "that document does not exist";
			}
		},
		(err) => {
			console.log(err.message);
			documents.value = null;
			error.value = "could not fetch documen";
		},
	);

	watchEffect((onInvalidate) => {
		// unsub from prev collection when watcher is stopped (component unmounted)
		onInvalidate(() => unsub());
	});

	return { post, error };
};

export default getSingleCollection;
