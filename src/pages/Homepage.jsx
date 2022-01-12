import { useState } from "react";
import { Container, Button, Alert } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import InputModal from "../components/InputModal";
import AlbumsList from "../components/AlbumsList";
import useModal from "../hooks/useModal";
import useAlbum from "../hooks/useAlbum";

const HomePage = () => {
  const [input, setInput] = useState("");

  const [openModal, closeModal, show] = useModal();

  const { user } = useAuthContext();

  const {deleteAlbumById, createAlbum, albumQuery, message } = useAlbum();

  const handleSubmit = (e) => {
    e.preventDefault();
    createAlbum(input.trim());
  };

  

  if (albumQuery.isLoading) return <h3>Loading ...</h3>;
  if (albumQuery.isError) return <h3>Something went wrong</h3>;

  return (
    <>
      <Container>
        <h1 className="my-3">
          Welcome <span>{user?.email}</span>
        </h1>
        <Button onClick={openModal} variant="success">
          Create New Album
        </Button>
        {message && <Alert variant="success" className="my-3 text-center">{message}</Alert>}

        {albumQuery.data && albumQuery.data.length > 0 ? (
          <div>
            <h3 className="my-3">Your Albums</h3>
            <AlbumsList
              deleteAlbumById={deleteAlbumById}
              albums={albumQuery?.data}
            />
          </div>
        ) : (
          <h3 className="my-3">No albums here yet ...</h3>
        )}
      </Container>
      <InputModal
        handleSubmit={handleSubmit}
        show={show}
        handleClose={closeModal}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default HomePage;
