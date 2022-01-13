import ImageCard from "./ImageCard";
import { Button, Alert } from "react-bootstrap";
import usePreview from "../hooks/usePreview.js";

const Selected = ({ selected, total, owner, editImage, isCustomer }) => {
  const { createAlbum, isLoading, message } = usePreview();

  const createNewAlbumFromSelection = () => {
    const imageToKeep = selected.filter((item) => item.liked === true);
    createAlbum(owner, imageToKeep);
  };

  return (
    <div>
      {message && (
        <Alert className="text-center my-3" variant={message.type}>
          <p>{message.msg} </p>
          <p>{isCustomer && 'You may close this page'}</p>
        </Alert>
      )}

      {!message && (
        <>
          <p className="text-end">
            {total} of {selected.length} kept{" "}
          </p>
          <div className="wrapper">
            {selected?.map((item, i) => {
              const isLiked = item.liked ? true : false;
              return (
                <ImageCard
                  key={i}
                  isLiked={isLiked}
                  item={item}
                  handleClick={() => editImage(item)}
                />
              );
            })}
          </div>
          <Button
            style={{ width: "100%" }}
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
