/**
 * Import dropzone - (final: only available if user is logged)
 * Create button which fires up the focus mode where you could choose images to keep
 * Need to create a link for the photagrapher to send to the user x
 * Read images with albumid x
 * Renderlist component x
 * Use React lightbox to let user se the images more clearly
 */

import { Container, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import useImages from "../hooks/useImages";
import ImageList from "../components/ImageList";
import Dropzone from "../components/DropZone";
import { useAuthContext } from "../contexts/AuthContext";
import UrlModal from "../components/UrlModal";
import { useState } from "react";

const AlbumPage = () => {
  const [show, setShow] = useState(false);
  const { user } = useAuthContext();
  const { pathname } = useLocation();

  const { albumId } = useParams();

  const { albumQuery } = useAlbum({
    onAlbumPage: true,
    albumId,
  });

  const images = useImages(albumId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${album.error}`}</h1>;

  return (
    <Container>
      {user ? (
        <>
          <div className="my-3 d-md-flex justify-content-between align-items-center">
            <p>Album name: {albumQuery.data[0].albumName}</p>
            <Button onClick={handleShow}>Generate url</Button>
            <UrlModal show={show} handleClose={handleClose} url={pathname} />
          </div>
          <Dropzone albumId={albumId} />
        </>
      ) : (
        <h3>Review your album</h3>
      )}
      <ImageList {...images} />
    </Container>
  );
};

export default AlbumPage;
