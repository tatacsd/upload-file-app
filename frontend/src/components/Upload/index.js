import React, { Component } from "react";
import Dropzone from "react-dropzone";

import { DropContainer, UploadMessage } from "./styles";

export default class Upload extends Component {
  rederDragMessage = (isDragActive, isDragReject) => {
    if (!isDragActive) {
      return <UploadMessage>Drop files here to upload...</UploadMessage>;
    }

    if (isDragReject) {
      return (
        <UploadMessage type="error">This file is not supported</UploadMessage>
      );
    }

    return (
      <UploadMessage type="success">Drop files here to upload</UploadMessage>
    );
  };

  render() {
    const { onUpload } = this.props;
    return (
      <Dropzone accept="image/*" onDropAccepted={onUpload}>
        {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
          <DropContainer
            {...getRootProps()}
            isDragActive={isDragActive}
            isDragReject={isDragReject}
          >
            <input {...getInputProps()} />
            {this.rederDragMessage(isDragActive, isDragReject)}
          </DropContainer>
        )}
      </Dropzone>
    );
  }
}
