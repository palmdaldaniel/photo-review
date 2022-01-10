import ImageList from "../components/ImageList";
import { Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
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
    setSelected,
    handleSelectedImage,
    editImage,
  } = useSelect();

  const { albumQuery } = useAlbum({
    isSingleAlbum: true,
    albumId,
  });

  const images = useImages(albumId);

  const reviewPhotos = () => nextStep(2);

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${album.error}`}</h1>;

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
          owner={albumQuery.data[0].owner}
          total={total}
          selected={selected}
          editImage={editImage}
        />
      )}
    </Container>
  );
};

export default ReviewPage;
