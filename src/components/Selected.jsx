import { updateImage } from "../utils/helpers.js";
import ImageCard from "./ImageCard";
import { Row, Col, Button, Alert } from "react-bootstrap";
import usePreview from "../hooks/usePreview.js";

const Selected = ({ selected, total, owner, editImage }) => {
  const { createAlbum, isLoading, message } = usePreview();



  const createNewAlbumFromSelection = () => {
    const imageToKeep = selected.filter((item) => item.liked === true); 
    createAlbum(owner, imageToKeep);
  };

  return (
    <div>
      {message && <Alert className="text-center" variant={message.type}>{message.msg}</Alert>}

      {!message && (
        <>
          <p className="text-end">
            {total} of {selected.length} kept{" "}
          </p>
          <Row>
            {selected?.map((item, i) => {
              const isLiked = item.liked ? true : false;
              return (
                <Col key={i} xs={12} sm={4} md={3}>
                  <ImageCard
                    isLiked={isLiked}
                    item={item}
                    handleClick={() => editImage(item)} 
                  />
                </Col>
              );
            })}
          </Row>
          <Button
            className="my-3"
            disabled={isLoading}
            variant="success"
            onClick={createNewAlbumFromSelection}
          >
            Create new album from selection
          </Button>
        </>
      )}
    </div>
  );
};

export default Selected;
