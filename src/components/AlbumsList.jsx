import { Button, Table } from "react-bootstrap";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { formattedDate } from "../utils/helpers";
import InputModal from "./InputModal";
import useModal from "../hooks/useModal";


const AlbumsList = ({ albums, deleteAlbumById }) => {
  const [openModal, closeModal, show] = useModal();
  const [docInfo, setDocInfo] = useState();

  const getCredentialsAndOpenModal = (documentId, albumId) => {
    setDocInfo({ documentId, albumId });
    openModal();
  };

  const deleteAlbum = () => {
    deleteAlbumById(docInfo)
    closeModal()
  };

  return (
    <Table responsive striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Created</th>
          <th>Updated</th>
        </tr>
      </thead>
      <tbody>
        {albums.map((album, i) => {
          const [created, updated] = formattedDate(album.created, album.edited);

          return (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>
                <Link to={`/albums/${album.albumId}`}>{album.albumName}</Link>
              </td>
              <td>{created}</td>
              <td>{updated}</td>
              <td className="d-flex justify-content-center">
                <Button
                  onClick={() =>
                    getCredentialsAndOpenModal(album._id, album.albumId)
                  }
                  variant="danger"
                >
                  Delete Me
                </Button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <InputModal
        deleteAlbum={deleteAlbum}
        show={show}
        handleClose={closeModal}
        isConfirm={true}
      />
    </Table>
  );
};

export default AlbumsList;
