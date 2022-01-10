import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import usePreview from "../hooks/usePreview.js";

const Selector = ({ data, selected, setSelected, setStep, }) => {
  const [index, setIndex] = useState(0);
  const [isSelected, setIsSelected] = useState(false);

  const reviewImage = (params) => {
    setSelected((prev) => {
      if (!prev) {
        return [params];
      }

      return [...prev, { image: params.image, liked: params.liked }];
    });

    setIndex((prev) => {
      if (index + 1 === data.length) {
        setIsSelected(true);
        return prev;
      }

      return prev + 1;
    });
  };

 
  const reviewFinished = () => setStep(3);

  return (
    <Container>
      {data && (
        <>
          <h3 className="text-center">Hot or not?</h3>
          <div className="selecter-wrapper">
          <div className="img-wrapper my-2">
          <img src={data[index].url} alt="" />
          </div>


          {!isSelected ? (
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
          ) : (
            <Button onClick={reviewFinished} variant="success">
              Finished Reviewing
            </Button>
          )}
          </div>
        </>
      )}
    </Container>
  );
};

export default Selector;
