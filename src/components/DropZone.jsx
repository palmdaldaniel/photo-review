import React, { useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import {
  baseStyle,
  activeStyle,
  acceptStyle,
  rejectStyle,
} from "../utils/DropZoneStyles";

import useUploadFiles from "../hooks/useUploadFiles";

const Dropzone = () => {
  const fileUploader = useUploadFiles();
  const onDrop = useCallback((acceptedFiles) => {
    fileUploader.upload(acceptedFiles);
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, accept: ["image/*", "png"] });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  return (
    <div {...getRootProps({ style })} className="my-3">
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  );
};

export default Dropzone;
