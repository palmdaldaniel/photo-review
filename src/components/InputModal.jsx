import { Modal, Button, Form } from "react-bootstrap";

const InputModal = ({
  show,
  handleClose,
  handleSubmit,
  setInput,
  input,
  isConfirm,
  deleteAlbum
}) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} centered keyboard={false}>
        {isConfirm && (
          <>
            <Modal.Header closeButton>Deleting</Modal.Header>
            <Modal.Body>Are you sure you want to delete this album?</Modal.Body>
            <Modal.Footer>
              <Button onClick={deleteAlbum} variant="danger">
       Confirm
              </Button>
            </Modal.Footer>
          </>
        )}

        {!isConfirm && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>Name your album</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
              <Modal.Body>
                <Form.Control
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  required
                  type="text"
                  placeholder="Enter Album Name"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button type="submit" variant="primary">
                  Continue
                </Button>
              </Modal.Footer>
            </Form>
          </>
        )}
      </Modal>
    </>
  );
};

export default InputModal;
