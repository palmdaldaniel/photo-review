import { Button } from "react-bootstrap";

const ImageCard = ({ item, handleClick, isLiked }) => {
  return (
    <div className="wrapper-content">
      <div className={`wrapper-content-img-container ${isLiked ? "liked" : "disliked"}`}>
        <img src={item.image.url} alt="" />
      </div>

      <Button  onClick={() => handleClick(item)} variant={isLiked ? 'warning' : 'success'}>
        {isLiked ? 'Unselect me' : 'Select me'}
      </Button>
    </div>
  );
};

export default ImageCard;