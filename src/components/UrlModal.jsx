import { Modal, Button, Form } from "react-bootstrap";

const UrlModal = ({ show, handleClose, url }) => {
  return (
    <>
      <Modal show={show} onHide={() => handleClose('url')} centered keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Album url</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control readOnly type="text" value={'https://cranky-elion-781b13.netlify.app' + url} />
        </Modal.Body>
        <Modal.Footer>
          <Button  onClick={() => handleClose('url')} variant="primary">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UrlModal;
