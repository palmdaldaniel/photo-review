import ImageList from "../components/ImageList";
import { Container, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import useImages from "../hooks/useImages";
import Selecter from "../components/Selecter";

const ReviewPage = () => {
  const { pathname } = useLocation();
  

  const { albumId } = useParams();

  const { albumQuery } = useAlbum({
    isSingleAlbum: true,
    albumId,
  });

  const images = useImages(albumId);

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${album.error}`}</h1>;

  return (
    <Container>
      <div className="d-md-flex justify-content-between align-items-center">
        <h1>Welcome to preview page.</h1>
        <Button variant="success">Review Photos</Button>
      </div>
      
      <ImageList isThumbnail={true} {...images} />
      <Selecter {...images}  />
    </Container>
  );
};

export default ReviewPage;
