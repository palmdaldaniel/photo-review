import { useState } from "react";
import { Button } from "react-bootstrap";

const Selector = ({ data, nextStep, handleSelectedImage }) => {
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const reviewImage = (params) => {
    // add selected image to selected array
    handleSelectedImage(params);

    // display next image
    setIndex((prev) => {
      if (index + 1 === data.length) {
        setIsSelected(true);
        return prev;
      }

      return prev + 1;
    });
  };

  const reviewFinished = () => nextStep(3);

  return (
    <>
      {data && !isSelected ? (
        <div className="wrapper-select">
          <h3 className="text-center">Hot or not?</h3>
          <div className="wrapper-select-image">
            <img src={data[index].url} alt="" />
          </div>
          <div className="wrapper-select-buttons">
            <Button
              onClick={() =>
                reviewImage({
                  image: data[index],
                  liked: false,
                })
              }
              disabled={isSelected}
              className="m-1"
              variant="danger"
            >
              🧊
            </Button>
            <Button
              variant="success"
              onClick={() =>
                reviewImage({
                  image: data[index],
                  liked: true,
                })
              }
              disabled={isSelected}
              className="m-1"
            >
              🔥
            </Button>
          </div>
        </div>
      ) : (
        <div className="selecter-wrapper">
          <Button onClick={reviewFinished}>Go to selection</Button>
        </div>
      )}

      {/*  {data && !isSelected ? (
        <>
          <h3 className="text-center">Hot or not?</h3>
          <div className="selecter-wrapper">
            <div className="img-wrapper my-2">
              <img src={data[index].url} alt="" />
            </div>


            <div className="d-flex">
              <Button
                onClick={() =>
                  reviewImage({
                    image: data[index],
                    liked: false,
                  })
                }
                disabled={isSelected}
                className="m-1"
                variant="danger"
              >
                🧊
              </Button>
              <Button
                variant="success"
                onClick={() =>
                  reviewImage({
                    image: data[index],
                    liked: true,
                  })
                }
                disabled={isSelected}
                className="m-1"
              >
                🔥
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className="selecter-wrapper">
        <Button onClick={reviewFinished}>
          Go to selection
        </Button>
        </div>
      )} */}
    </>
  );
};

export default Selector;
