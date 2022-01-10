/**
 *  Skapa en useBucket för att ta bort bilder
 * 
 */




import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc,
  getDocs,
  deleteDoc,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db, storage } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import useCollection from "./useCollection"


const useAlbum = (params = {}) => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { deleteAlbumDoc } = useCollection()

  const albumColRef = collection(db, "albums");

  const queryKey = params.onAlbumPage
    ? ["album", params.albumId]
    : ["albums", user.uid];

  const queryRef = params.onAlbumPage
    ? // gets single album
      query(albumColRef, where("albumId", "==", params.albumId))
    : // gets all albums for specific owner
      query(albumColRef, where("owner", "==", user.uid));

  const albumQuery = useFirestoreQueryData(
    queryKey,
    queryRef,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      refetchOnMount: "always",
    }
  );

  const createAlbum = async (name) => {
    const uuid = uuidv4();

    try { 
      await addDoc(albumColRef, {
        albumId: uuid,
        albumName: name,
        created: serverTimestamp(),
        edited: serverTimestamp(),
        owner: user.uid,
      });

      // when all is good and well
      navigate(`/albums/${uuid}`);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  const editAlbum = async (albumName, albumId) => {
    const albumRef = doc(db, "albums", albumId);
    try {
      await updateDoc(albumRef, {
        albumName,
      });
    } catch (error) {
      console.log(error.message);
    }
  };



  const deleteAlbumById = async ({ documentId, albumId  }) => {
      
      await deleteAlbumDoc(documentId, albumId)

    return;

    // make into one function
    const ref = collection(db, "images");
    const queryRef = query(ref);
    const qS = await getDocs(queryRef);

    qS.forEach((doc) => {
      const document = doc.data();
      const res = findAlbums(document.path);
      // resolve promise from find albums page.
      res.then((item) => {
        if (item.length > 1) {
          console.log("more albums uses this images", item);
          return;
        }

        deleteImageFromBucket(item[0].path);

        console.log("fire delete functino for bucket");
      });
    });
  };

 
  const findAlbums = async (path) => {
    const arr = [];

    const anotherRef = collection(db, "images");
    const anotherQueryRef = query(anotherRef, where("path", "==", path));
    const mathingImages = await getDocs(anotherQueryRef);

    mathingImages.forEach((doc) => {
      arr.push(doc.data());
    });

    return arr;
  };

  const deleteImageFromBucket = async (path) => {
    console.log("lets go a head and delete");

    const imageRef = ref(storage, path);

    try {
      await deleteObject(imageRef);

      console.log("profit, image deleted with path ::>", path);
    } catch (error) {
      console.log("error", error.message);
    }
  };

  return { createAlbum, albumQuery, editAlbum, deleteAlbumById };
};

export default useAlbum;
