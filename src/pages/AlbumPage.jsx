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

const AlbumPage = () => {
  const [selected, setSelected] = useState();
  const [show, setShow] = useState(false);
  const [imageId, setImageId] = useState();
  const [isSelecting, setIsSelecting] = useState(true);
  const [step, setStep] = useState(1)
  const [total, setTotal] = useState(0);
  const { pathname } = useLocation();
  const { albumId } = useParams();

  const { albumQuery } = useAlbum({
    onAlbumPage: true,
    albumId,
  });

  useEffect(() => {
   
    
    if (selected) {
      const totVal = selected.filter((item) => item.liked === true).length;
      setTotal(totVal);
    }
  }, [selected]);


  // deleteSingleimage
  const { deleteDocument } = useImage(albumId);

  const images = useImages(albumId);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteImage = (id, path) => deleteDocument(id, path);


  // reset users selecting flow.
  const resetSelection = () => {
    setStep(1);
    setSelected(null);
  };

  const nextStep = () => {
    setStep(2);
  };

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
              onClick={step === 1 ? nextStep : resetSelection}
              variant={step !== 1 ? "danger" : "success"}
              className="album-handler-button"
            >
              {step !== 1 ? "Stop selecting" : "Select Images"}
            </Button>
          </div>
          <UrlModal show={show} handleClose={handleClose} url={pathname} />
        </div>

        {step === 1 && (
          <>
            <Dropzone albumId={albumId} />{" "}
            <ImageList handleClick={deleteImage} {...images} />{" "}
          </>
        )}

        {step === 2 && (
          <Selecter selected={selected} setSelected={setSelected} {...images} setStep={setStep} />
        )}

        {step === 3 && <Selected  owner={albumQuery.data[0].owner} total={total} selected={selected} setSelected={setSelected}  /> }
      </>
    </Container>
  );
};

export default AlbumPage;
