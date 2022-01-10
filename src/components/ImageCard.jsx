import { Button } from "react-bootstrap";

const ImageCard = ({ item, handleClick, isLiked }) => {
  return (
    <>
      <p>{isLiked ? "liked" : "disliked"}</p>
      <div
        onClick={() => handleClick(item)}
        className={`selected img-wrapper ${isLiked ? "liked" : "disliked"}`}
      >
        <img src={item.image.url} alt="" />
      </div>
      {/*  <Button
        variant="danger"
        // for deleting img --  onClick={() => handleClick(item._id, item.path)}
      >
        Delete me
      </Button> */}
    </>
  );
};

export default ImageCard;
