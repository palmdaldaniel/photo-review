import { collection, getDocs } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase";

const useBucket = () => {
  const colRef = collection(db, "images");

  const findRelatedDocuments = async (albumId) => {
    const totalImgDocs = [];

    const allImages = await getDocs(colRef);
    allImages.forEach((doc) => {
      totalImgDocs.push(doc.data());
    });

    const currentAlbum = totalImgDocs.filter(
      (document) => document.albumId === albumId
    );

    currentAlbum.forEach((document) => {
      const foundMatches = totalImgDocs.filter(
        (item) => item.path === document.path
      );

      if (foundMatches.length === 1) {
        deleteFromBucket(foundMatches[0].path);
      }

      console.log("no matches to be found");
    });
    return;
  };

  const deleteFromBucket = async (path) => {
    const imageRef = ref(storage, path);
    try {
      await deleteObject(imageRef);
      console.log("profit, image deleted with path ::>", path);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { deleteFromBucket, findRelatedDocuments };
};

export default useBucket;
