
/**
 * feed card with images
 * 
 *  reed from firestore with react query firebase? 
 * 
 */


import useImages from "../hooks/useImages";
import ImageCard from "../components/ImageCard"

import { Row, Col } from "react-bootstrap";


const ImageList = () => {

    const images = useImages()

    if(images.isLoading) return <h1>Loding ...</h1>
    if(images.isError) return <h1>{`${images.error}`}</h1>



    return <div className="mx-auto">
        <Row>
        
        {images?.data.map((item, i) => {
            
            return <Col xs={12} sm={6} md={4} ><ImageCard xs={12} sm={6} md={4} item={item} key={item._id} /></Col>

        })}
        </Row>
    </div>
}
 
export default ImageList;