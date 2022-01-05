import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const useImages = (albumId = null) => {
  const imageColRef = collection(db, "images");

  const queryKey = ["images", albumId];

  const queryRef =  query(imageColRef, where("albumId", "==", albumId));

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
};

export default useImages;
