import { Row, Col, Button } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";

const ImageList = ({ isLoading, isError, data, isThumbnail, handleClick }) => {
  
  if (isLoading) return <h1>Loding ...</h1>;
  if (isError) return <h1>{`${images.error}`}</h1>;

  return (
    <div className="mx-auto">
      <SRLWrapper>
        <Row>
          {data &&
            data.map((item) => {
              return (
                <Col xs={12} sm={4} md={3} key={item._id}>
                  <div className="img-wrapper">
                    <img src={item.url} alt="" />
                  </div>

                  {!isThumbnail && (
                    <Button
                      variant="danger"
                      onClick={() => handleClick(item._id, item.path)}
                    >
                      Delete me
                    </Button>
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
