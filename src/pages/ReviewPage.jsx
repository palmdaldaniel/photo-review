import ImageList from "../components/ImageList";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useImages from "../hooks/useImages";
import useSelect from "../hooks/useSelect";
import Selecter from "../components/Selecter";
import Selected from "../components/Selected";

const ReviewPage = () => {
  const { albumId } = useParams();

  const {
    step,
    nextStep,
    total,
    selected,
    handleSelectedImage,
    editImage,
  } = useSelect();

  const images = useImages(albumId);

  const reviewPhotos = () => nextStep(2);

  if (images.isLoading) return <h1>Loding ...</h1>;
  if (images.isError) return <h1>{`${images.error}`}</h1>;

  return (
    <Container>
      {/* Show inital view */}
      {step === 1 && (
        <>
          <div className="d-md-flex justify-content-between align-items-center">
            <h1>Welcome to preview page.</h1>
            <Button onClick={reviewPhotos} variant="success">
              Select photos
            </Button>
          </div>
          <ImageList isThumbnail={true} {...images} />
        </>
      )}

      {/* Show Select mode */}
      {step === 2 && (
        <Selecter
          selected={selected}
          {...images}
          nextStep={nextStep}
          handleSelectedImage={handleSelectedImage}
        />
      )}

      {/* Show result */}
      {step === 3 && (
        <Selected
          owner={images.data[0].owner} 
          total={total}
          selected={selected}
          editImage={editImage}
        />
      )}
    </Container>
  );
};

export default ReviewPage;
