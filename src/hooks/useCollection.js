import {
  collection,
  query,
  where,
  doc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";

import { db } from "../firebase";

const useCollection = () => {
  const imagesRef = collection(db, "images");

  const deleteAlbumDoc = async (documentId, albumId) => {
    try {
      await deleteDoc(doc(db, "albums", documentId));
      await checkForDocChildren(albumId);
      
    } catch (error) {
      console.log("error", error.message);
    }

  };

  // for every document attached to it's parent
  const checkForDocChildren = async (id) => {
    console.log("checking for doc children");

    // find documents from images collection connected the album
    const imgsQueryRef = query(imagesRef, where("albumId", "==", id));
    const result = await getDocs(imgsQueryRef);

    try {
      result.forEach(async ({ id }) => {
        const imageId = id;
        await deleteDoc(doc(db, "images", imageId));
      });
    } catch (error) {
      console.log("error", error.message);
    }

    console.log("returning to parent function");

  };

  return { deleteAlbumDoc };
};

export default useCollection;
