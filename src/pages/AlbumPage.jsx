/**
 * Generate url to send to customer
 */

import { Container, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import useImages from "../hooks/useImages";
import useImage from "../hooks/useImage";
import ImageList from "../components/ImageList";
import Dropzone from "../components/DropZone";

import UrlModal from "../components/UrlModal";
import { useEffect, useState } from "react";
import Selecter from "../components/Selecter";

const AlbumPage = () => {
  const [show, setShow] = useState(false);
  const [imageId, setImageId] = useState();
  const { pathname } = useLocation();
  const { albumId } = useParams();

  const { albumQuery } = useAlbum({
    onAlbumPage: true,
    albumId,
  });

  // deleteSingleimage
  const { deleteDocument } = useImage(albumId);

  const images = useImages(albumId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteImage = (id, path) => deleteDocument(id, path);

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${album.error}`}</h1>;

  return (
    <Container>
      <>
        <div className="my-3 d-md-flex justify-content-between align-items-center">
          <p>Album name: {albumQuery.data[0].albumName}</p>
          <Button onClick={handleShow}>Generate url</Button>
          <UrlModal show={show} handleClose={handleClose} url={pathname} />
        </div>
        <Dropzone albumId={albumId} />
      </>
      <ImageList handleClick={deleteImage} {...images} />

      <Selecter data={images.data} />
    </Container>
  );
};

export default AlbumPage;
