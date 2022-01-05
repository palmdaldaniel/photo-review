import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

const useAlbum = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  return { createAlbum };
};

export default useAlbum;
