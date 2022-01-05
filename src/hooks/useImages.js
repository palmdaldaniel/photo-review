import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { useAuthContext } from "../contexts/AuthContext";

const useImages = () => {
  // get user cred.
  const { user } = useAuthContext();

  const imageColRef = collection(db, "images");

  const queryKey = ["images", user.uid];

  const queryRef = query(imageColRef, where("owner", "==", user.uid));

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
