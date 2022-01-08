/**
 *  Delete a document x
 *  Delete images whenevier there is no more album usng this image.
 *   
 
 * 
 */

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import {
  doc,
  deleteDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

import { storage, db } from "../firebase";

const useImage = () => {
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

      deleteImage(path)
    }

    try {
      await deleteDoc(doc(db, "images", id));
      console.log("profit");
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const deleteImage = async (path) => {

  console.log('lets go a head and delete')

  const imageRef = ref(storage, path);

  try {

    await deleteObject(imageRef)

    console.log('profit, image deleted with path ::>', path)
    
  } catch (error) {

    console.log('error', error.message)
    
  }


};

  return { deleteDocument };
};

export default useImage;
