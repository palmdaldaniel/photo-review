import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'

const useImages = () => {   
    const imagesRef = collection(db, 'images')


    return useFirestoreQueryData(['images'], imagesRef, {
        idField: '_id',
        subscribe: true,
    }, {
        refetchOnMount: 'always',
    })
}
 
export default useImages;


