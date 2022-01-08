import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  doc,
  updateDoc
} from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const       useAlbum = (params = {}) => {

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const albumColRef = collection(db, "albums");

  const queryKey = params.isSingleAlbum
    ? ["album", params.albumId]
    : ["albums", user.uid];

  const queryRef = params.isSingleAlbum
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
    const albumColref = collection(db, "albums");

    try {
      await addDoc(albumColref, {
        albumId: uuid,
        albumName: name,
        created: serverTimestamp(),
        edited: serverTimestamp(),
        owner: user.uid,
      });

      console.log('i am here')

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
        albumName
      })
    
    } catch (error) {
      console.log(error.message)  
    }


  }

  return { createAlbum, albumQuery, editAlbum };
};

export default useAlbum;
