/**
 *  Dropzone component - upload several images
 *  ImageList component
 *  Only display the current users images
 *
 *
 * Press Upload is done, takes you to the albums page
 *
 */

import {Container} from 'react-bootstrap'


import Dropzone from "../components/DropZone";

const UploadFilesPage = () => {
  return (
    <Container>
      <h1>Welcome to the Dropzone</h1>

      <Dropzone />
    </Container>
  );
};

export default UploadFilesPage;
