import { Row, Col } from "react-bootstrap";
import ImageCard from "../components/ImageCard";


const ImageList = ({ isLoading, isError, data }) => {
  if (isLoading) return <h1>Loding ...</h1>;
  if (isError) return <h1>{`${images.error}`}</h1>;

  return (
    <div className="mx-auto">
      <Row>
        {data &&
          data.map((item, i) => {
            return (
              <Col xs={12} sm={6} md={4} key={item._id}>
                <ImageCard xs={12} sm={6} md={4} item={item} key={item._id} />
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default ImageList;
