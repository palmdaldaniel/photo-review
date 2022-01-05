import { useState } from "react";

import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuidv4 } from "uuid";
import { collection, addDoc } from "firebase/firestore";
import { useAuthContext } from "../contexts/AuthContext";

const useUploadFiles = () => {
  const [message, setMessage] = useState(null);

  const { user } = useAuthContext()
  
  const upload = (images = null) => {
    if (!images) return;

    images.forEach((image) => {
      const uuid = uuidv4();

      // find file extension
      const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

      // create a reference to upload the file to
      const fileRef = ref(storage, `images/${uuid}.${ext}`);

      // upload image to fileRef
      const fileUploadTask = uploadBytesResumable(fileRef, image);

      fileUploadTask.on(
        "state_changed",
        (snapshot) => {
          console.log("this is the snapshot", snapshot);
        },
        (error) => {
          console.log(error.message);
          setMessage({
            type: "warning",
            msg: `Image failed to upload due to the following error: ${error}`,
          });
        },
        async () => {
          // get download url to uploaded file
          const url = await getDownloadURL(fileRef);

          // get reference to collection 'images'
          const collectionRef = collection(db, "images");

          // a document is created in the db
          await addDoc(collectionRef, {
            name: image.name,
            path: fileRef.fullPath,
            size: image.size,
            type: image.type,
            owner: user.uid,
            ext,
            url,
            uuid,
          });
          setMessage({
            type: "success",
            msg: "Congrats your file/files are uploaded",
          });
        }
      );
    });
  };
  return { upload, message };
};

export default useUploadFiles;
