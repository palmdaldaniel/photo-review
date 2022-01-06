import { Row, Col } from "react-bootstrap";
import ImageCard from "../components/ImageCard";
import ThumbNail from "../components/ThumbNail";
import { SRLWrapper } from "simple-react-lightbox";

const ImageList = ({ isLoading, isError, data, isThumbnail }) => {
  if (isLoading) return <h1>Loding ...</h1>;
  if (isError) return <h1>{`${images.error}`}</h1>;

  return (
    <div className="mx-auto">
      <SRLWrapper>
        <Row>
          {data &&
            data.map((item, i) => {
              return (
                <Col xs={12} sm={6} md={4} key={item._id}>
                  {isThumbnail ? (
                    <ThumbNail key={item._id} item={item} />
                  ) : (
                    <ImageCard
                      item={item}
                      key={item._id}
                    />
                  )}
                </Col>
              );
            })}
        </Row>
      </SRLWrapper>
    </div>
  );
};

export default ImageList;