import {
  doc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";
import useBucket from "./useBucket";

const useImage = () => {
  const { deleteFromBucket } = useBucket();

  const deleteDocument = async (id, path) => {
    const imagesColRef = collection(db, "images");
    const queryRef = query(imagesColRef, where("path", "==", path));
    const querySnapshot = await getDocs(queryRef);

    let arr = [];
    querySnapshot.forEach((doc) => {
      arr.push(doc.data());
    });

    if (arr.length === 1) {
      console.log("fire deletefunction");
      deleteFromBucket(path);
    }

    try {
      await deleteDoc(doc(db, "images", id));
      console.log("profit");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { deleteDocument };
};

export default useImage;
