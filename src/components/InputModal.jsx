import { Modal, Button, Form } from "react-bootstrap";

const InputModal = ({ show, handleClose, handleSubmit, setInput }) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Name your album</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Control
              onChange={(e) => setInput(e.target.value)}
              required
              type="text"
              placeholder="Enter Album Name"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">Continue</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default InputModal;
