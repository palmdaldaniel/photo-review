import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";

const Selector = ({ data }) => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selected) {
      const totVal = selected.filter((item) => item.liked === true).length;

      setTotal(totVal);
    }
  }, [selected]);

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

  const editImage = (params) => {
    const index = selected.findIndex(
      (image) => image.image.uuid === params.image.uuid
    );

    const moddarr = selected;

    moddarr.splice(index, 1, { image: params.image, liked: params.liked });

    setSelected([...moddarr]);
  };

  return (
    <Container>
      {data && (
        <>
          <p>
            {total} of {data.length} kept
          </p>
          <h1>Select your images</h1>
          <p>{data[index].uuid}</p>
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
              >
                💣
              </Button>
              <Button
                onClick={() =>
                  reviewImage({
                    image: data[index],
                    liked: true,
                  })
                }
                disabled={isSelected}
                className="m-1"
              >
                🚀
              </Button>
            </div>
          ) : (
            <Button variant="success">Finished Reviewing</Button>
          )}
        </>
      )}

      <div>
        <ul>
          {selected?.map((item, i) => {
            return (
              <li
                onClick={() =>
                  editImage({
                    image: item.image,
                    liked: !item.liked,
                    edited: true,
                  })
                }
                key={i}
                style={{ color: item.liked ? "green" : "red" }}
              >
                {item.image.uuid}
              </li>
            );
          })}
        </ul>
      </div>
    </Container>
  );
};

export default Selector;
