import { Row, Col, Button } from "react-bootstrap";
import { SRLWrapper } from "simple-react-lightbox";

const ImageList = ({ isLoading, isError, data, isThumbnail, handleClick }) => {
  if (isLoading) return <h1>Loding ...</h1>;
  if (isError) return <h1>{`${images.error}`}</h1>;

  return (
    <div className="mx-auto my-3">
      <SRLWrapper>
        <div className="wrapper">
        {data &&
          data.map((item) => {
            return (
              <div  key={item._id} className="wrapper-content">
                <div className="wrapper-content-img-container">
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
              </div>
            );
          })}
          </div>
      </SRLWrapper>
    </div>
  );
};

export default ImageList;
