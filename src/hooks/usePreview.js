// den skapar samma bild två gånger

import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { db } from "../firebase";

import { v4 as uuidv4 } from "uuid";

const usePreview = () => {
  const createAlbum = async (owner, selected) => {    
    /**
     * create new album id
     * take owner from image
     * set an album name somehow
     * set created value
     * set edited value
     */

    const uuid = uuidv4();

    console.log('uuid', uuid)
    const albumColref = collection(db, "albums");
    const imageColref = collection(db, "images");

    try {

        console.log('not here yet')
      await addDoc(albumColref, {
        albumId: uuid,
        albumName: owner,
        created: serverTimestamp(),
        edited: serverTimestamp(),
        owner,
      });

      selected.forEach(item => {

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
            uuid: imageUuid
          });

        
      })

      

      console.log("it works, profit and profit again");
    } catch (error) {
      console.log("error", error.message);
    }
  };


  

  return { createAlbum }
};

export default usePreview;
