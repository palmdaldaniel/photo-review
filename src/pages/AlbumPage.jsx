/**
 * Import dropzone - (final: only available if user is logged)
 * Create button which fires up the focus mode where you could choose images to keep
 * Need to create a link for the photagrapher to send to the user x
 * Read images with albumid x
 * Renderlist component x
 * Use React lightbox to let user se the images more clearly
 */

import { Container } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import useAlbumSpec from "../hooks/useAlbumSpec";
import useImages from "../hooks/useImages";
import ImageList from "../components/ImageList";
import Dropzone from "../components/DropZone";
import { useAuthContext } from "../contexts/AuthContext";

const AlbumPage = () => {
  const { user } = useAuthContext()
  const { pathname } = useLocation();

  const { albumId } = useParams();

  // fetch album by id
  const album = useAlbumSpec(albumId);

  const images = useImages(albumId);

  if (album.isLoading) return <h1>Loding ...</h1>;
  if (album.isError) return <h1>{`${album.error}`}</h1>;

  return (
    <Container>
      <p>Album name: {album.data[0].albumName}</p>
      <p>url: {pathname}</p>
     { user && <Dropzone albumId={albumId} />}

      <ImageList {...images} />
    </Container>
  );
};

export default AlbumPage;
