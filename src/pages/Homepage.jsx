import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import InputModal from "../components/InputModal";
import useAlbum from "../hooks/useAlbum";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState("");
  const [albumId, setAlbumId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { user } = useAuthContext();
  const { createAlbum, albumQuery, editAlbum } = useAlbum();

  console.log(albumQuery?.data);

  const handleClose = () => {
    setShow(false);
    setInput("");
  };
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      console.log("go ahead and edit");
      editAlbum(input.trim(), albumId);
      setIsEditing(false);
      setAlbumId(null);
      handleClose();
      return;
    }

    console.log("go ahead and create a new album");

    createAlbum(input.trim().replaceAll(" ", "-"));
  };

  const editName = (item) => {
    setAlbumId(item._id);

    // prep modal with album name
    setInput(item.albumName);

    // enter editing mode
    setIsEditing(true);

    // open den modal
    handleShow();
  };

  return (
    <>
      <Container>
        <h1 className="my-3">
          Welcome <span>{user?.email}</span>
        </h1>
        <Button onClick={handleShow} variant="success">
          Create New Album
        </Button>

        <h3 className="my-3">Your Albums</h3>

        {albumQuery.isLoading && <h1>Loading ...</h1>}
        <ul>
          {albumQuery.data &&
            albumQuery.data.map((item, i) => {
              return (
                <li key={i}>
                  <Link to={`/albums/${item.albumId}`}>{item.albumName}</Link>
                  <span
                    onClick={() => editName(item)}
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    className="m-3"
                  >
                    Edit me
                  </span>
                </li>
              );
            })}
        </ul>
      </Container>
      <InputModal
        handleSubmit={handleSubmit}
        show={show}
        handleClose={handleClose}
        input={input}
        setInput={setInput}
      />
    </>
  );
};

export default HomePage;
