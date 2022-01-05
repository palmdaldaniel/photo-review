import { Container, Button } from "react-bootstrap";

// Components
import Dropzone from "../components/DropZone";
import ImageList from "../components/ImageList";

const UploadFilesPage = () => {
  return (
    <Container>
      <div className="d-md-flex justify-content-between align-items-center">
        <h1>Welcome to the Dropzone</h1>
        <Button variant="success" className="my-4">Review Album</Button>
      </div>

      <Dropzone />
      <ImageList />
    </Container>
  );
};

export default UploadFilesPage;
