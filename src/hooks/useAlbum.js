import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useState, useEffect } from "react";

import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

import useCollection from "./useCollection";
import useBucket from "./useBucket";

const useAlbum = (params = {}) => {
  const [message, setMessage] = useState(null);
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { deleteAlbumDoc } = useCollection();
  const { findRelatedDocuments } = useBucket();

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(() => setMessage(null), 3000);


    return () => clearTimeout(timeoutId);
  }, [message]);

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
        edited: serverTimestamp()
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteAlbumById = async ({ documentId, albumId }) => {
    // find all the images that is not use by any other album and delete them
    await findRelatedDocuments(albumId);

    await deleteAlbumDoc(documentId, albumId);

    setMessage(`Album with id ${albumId} deleted`);
  };

  return { createAlbum, albumQuery, editAlbum, deleteAlbumById, message };
};

export default useAlbum;
