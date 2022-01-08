import { Row, Col, Button } from "react-bootstrap";
import ImageCard from "../components/ImageCard";
import ThumbNail from "../components/ThumbNail";
import { SRLWrapper } from "simple-react-lightbox";

const ImageList = ({ isLoading, isError, data, isThumbnail, handleClick }) => {
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
                    <div>
                      <ImageCard item={item} key={item._id} />
                      <Button
                        variant="danger"
                        onClick={() => handleClick(item._id, item.path)}
                      >
                        Delete
                      </Button>
                    </div>
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
