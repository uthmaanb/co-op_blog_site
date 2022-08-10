import { ref } from "@vue/reactivity";
import { projectFirestore } from "../firebase/config";
import { watchEffect } from "@vue/runtime-core";

const getCollection = (collection) => {
  const documents = ref([]);
  const showPosts = ref(true);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt", "desc");

  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsub from prev collection when watcher is stopped (component unmounted)
    onInvalidate(() => unsub());
  });

  return { error, documents, showPosts };
};

export default getCollection;
