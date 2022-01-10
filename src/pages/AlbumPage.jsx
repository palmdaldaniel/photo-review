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
import Selected from "../components/Selected";

import UrlModal from "../components/UrlModal";
import { useState, useEffect } from "react";
import Selecter from "../components/Selecter";
import useSelect from "../hooks/useSelect";

const AlbumPage = () => {
  const {
    step,
    nextStep,
    total,
    selected,
    resetSelection,
    handleSelectedImage,
    editImage,
  } = useSelect();

  const [show, setShow] = useState(false);

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

  // reset users selecting flow.

  const reviewPhotos = () => nextStep(2);

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${album.error}`}</h1>;

  return (
    <Container>
      <>
        <div className="my-3 d-md-flex justify-content-between align-items-center">
          <div>
            <p>Album name: {albumQuery.data[0].albumName}</p>
            {images.data && (
              <p>
                Total amount:
                <span style={{ fontWeight: "bolder" }}>
                  {images.data.length}
                </span>
              </p>
            )}
          </div>
          <div className="album-handler">
            <Button className="album-handler-button" onClick={handleShow}>
              Generate url
            </Button>
            <Button
              onClick={step === 1 ? reviewPhotos : resetSelection}
              variant={step !== 1 ? "danger" : "success"}
              className="album-handler-button"
            >
              {step !== 1 ? "Reset Selection" : "Select Images"}
            </Button>
          </div>
          <UrlModal show={show} handleClose={handleClose} url={pathname} />
        </div>

        {step === 1 && (
          <>
            <Dropzone albumId={albumId} />{" "}
            <ImageList handleClick={deleteImage} {...images} />
          </>
        )}

        {step === 2 && (
          <Selecter
            selected={selected}
            {...images}
            nextStep={nextStep}
            handleSelectedImage={handleSelectedImage}
          />
        )}

        {step === 3 && (
          <Selected
            owner={albumQuery.data[0].owner}
            total={total}
            selected={selected}
            editImage={editImage}
          />
        )}
      </>
    </Container>
  );
};

export default AlbumPage;
