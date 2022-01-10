import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const usePreview = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const createAlbum = async (owner, selected) => {
    setMessage(null);
    const uuid = uuidv4();
    const albumColref = collection(db, "albums");
    const imageColref = collection(db, "images");

    try {
      setIsLoading(true);
      await addDoc(albumColref, {
        albumId: uuid,
        albumName: owner,
        created: serverTimestamp(),
        edited: serverTimestamp(),
        owner,
      });

      selected.forEach((item) => {
        const imageUuid = uuidv4();
        addDoc(imageColref, {
          albumId: uuid,
          name: item.image.name,
          path: item.image.path,
          size: item.image.size,
          type: item.image.type,
          owner: item.image.owner,
          ext: item.image.ext,
          url: item.image.url,
          uuid: imageUuid,
        });
      });

      setIsLoading(false);
      setMessage({
        msg: "New Album Created",
        type: "success",
      });
    } catch (error) {
      console.log(error.message);
      setMessage({
        msg: "Something Went Wrong",
        type: "warning",
      });
      setIsLoading(false);
    }
  };

  return { createAlbum, isLoading, message };
};

export default usePreview;
