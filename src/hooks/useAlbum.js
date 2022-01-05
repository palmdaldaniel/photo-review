import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
} from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const useAlbum = (params = {}) => {

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const albumColRef = collection(db, "albums");

  const queryKey = params.onAlbumPage
    ? ["album", params.albumId]
    : ["albums", user.uid];

  const queryRef = params.onAlbumPage
    ? // gets single album
      query(albumColRef, where("albumId", "==", params.albumId))
    : // gets all albums
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
    const albumColref = collection(db, "albums");

    try {
      await addDoc(albumColref, {
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

  return { createAlbum, albumQuery };
};

export default useAlbum;
