import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useAlbumSpec = (albumId) => {


   const albumColRef = collection(db, "albums");
  
   const queryKey = ["albums", albumId];
  
   const queryRef = query(albumColRef, where("albumId", "==", albumId));
  
  return useFirestoreQueryData(
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




}
 
export default useAlbumSpec;