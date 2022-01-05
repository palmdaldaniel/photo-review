import { Modal, Button, Form } from "react-bootstrap";

const UrlModal = ({ show, handleClose, url }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Album url</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control type="text" value={'netlifyname' + url} />
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={handleClose} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UrlModal;
