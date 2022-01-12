// add comment 
import { Container, Button } from "react-bootstrap";
import { useParams, useLocation } from "react-router-dom";
import useAlbum from "../hooks/useAlbum";
import useImages from "../hooks/useImages";
import useImage from "../hooks/useImage";
import ImageList from "../components/ImageList";
import Dropzone from "../components/DropZone";
import Selected from "../components/Selected";
import UrlModal from "../components/UrlModal";
import { useState } from "react";
import Selecter from "../components/Selecter";
import useSelect from "../hooks/useSelect";
import InputModal from "../components/InputModal";

const AlbumPage = () => {
  const [show, setShow] = useState(false);
  const [showUrl, setShowUrl] = useState(false);
  const [input, setInput] = useState("");

  const { pathname } = useLocation();
  const { albumId } = useParams();

  const {
    step,
    nextStep,
    total,
    selected,
    resetSelection,
    handleSelectedImage,
    editImage,
  } = useSelect();

  const { albumQuery, editAlbum } = useAlbum({
    onAlbumPage: true,
    albumId,
  });

  const images = useImages(albumId);

  const { deleteDocument } = useImage(albumId);

  const handleClose = (param) => {
    if (param) {
      setShowUrl(false);
    } else {
      setShow(false);
    }
  };
  
  const handleShow = (param) => {
    if (param) {
      setShowUrl(true);
    } else {
      setShow(true);
    }
  };

  const deleteImage = (id, path) => deleteDocument(id, path);

  const reviewPhotos = () => nextStep(2);

  const handleSubmit = (e) => {
    e.preventDefault();
    editAlbum(input.trim(), albumQuery?.data[0]._id);
    handleClose();
  };

  const editName = () => {
    // prep modal with album name
    setInput(albumQuery.data[0].albumName);

    // open den modal
    handleShow();
  };

  if (albumQuery.isLoading) return <h1>Loding ...</h1>;
  if (albumQuery.isError) return <h1>{`${albumQuery.error}`}</h1>;

  return (
    <Container>
      <div className="my-3 d-md-flex justify-content-between align-items-center">
        <div>
          <p>
            Album name: {albumQuery.data[0].albumName}
            <span onClick={editName} className="mx-3 edit-span">
              Change my name?
            </span>
          </p>
          <InputModal
            handleSubmit={handleSubmit}
            show={show}
            handleClose={handleClose}
            input={input}
            setInput={setInput}
          />

          {images.data && (
            <>
              <p>
                Total amount:
                <span style={{ fontWeight: "bolder" }}>
                  {images.data.length}
                </span>
              </p>
              <div className="album-handler">
                <Button
                  className="album-handler-button"
                  onClick={() => handleShow("url")}
                >
                  Generate url
                </Button>
                <Button
                  disabled={images.data.length === 0}
                  onClick={step === 1 ? reviewPhotos : resetSelection}
                  variant={step !== 1 ? "danger" : "success"}
                  className="album-handler-button"
                >
                  {step !== 1 ? "Reset Selection" : "Select Images"}
                </Button>
              </div>
            </>
          )}
        </div>

        <UrlModal show={showUrl} handleClose={handleClose} url={pathname} />
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
    </Container>
  );
};

export default AlbumPage;
