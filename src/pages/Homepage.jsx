import { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext";
import InputModal from "../components/InputModal";
import useAlbum from "../hooks/useAlbum";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState();

  const { user } = useAuthContext();
  const { createAlbum, albumQuery } = useAlbum();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("inputvalue", input);

    createAlbum(input.trim().replaceAll(" ", "-"));
  };

  return (
    <Container>
      <h1 className="my-3">
        Welcome <span>{user?.email}</span>
      </h1>
      <Button onClick={handleShow} variant="success">
        Create New Album
      </Button>

      <h3 className="my-3">Your Albums</h3>
      <InputModal
        handleSubmit={handleSubmit}
        show={show}
        handleClose={handleClose}
        input={input}
        setInput={setInput}
      />

      {albumQuery.isLoading && <h1>Loading ...</h1>}
      <ul>
        {albumQuery.data &&
          albumQuery.data.map((item, i) => {
            return (
              <li key={i}>
                <Link to={`/albums/${item.albumId}`}>{item.albumName}</Link>
              </li>
            );
          })}
      </ul>
    </Container>
  );
};

export default HomePage;
