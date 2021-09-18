import React, { Component } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";

import api from "./services/api";

import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";

import Upload from "./components/Upload";
import FileList from "./components/FileList";

export default class App extends Component {
  state = {
    uploadedFiles: [],
  };

  handleUpload = (files) => {
    // handle all files that were dropped
    const uploadedFiles = files.map((file) => ({
      file,
      id: uniqueId(),
      name: file.name,
      readableSize: fileSize(file.size),
      // Create a thumbnail before the image goes to the server
      preview: URL.createObjectURL(file),
      progress: 0,
      uploaded: false,
      error: false,
      url: null,
    }));

    // set the state
    // everytime a file is uploaded, the state is appended if it is successful
    this.setState({
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles),
    });

    // Send the file to the api
    uploadedFiles.forEach(this.processUpload);
  };

  // params: { id: of the file, data: all the data of the file }
  updateFile = (id, data) => {
    // if i have the same id, update the data rewriting the state else return the state the same
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map((uploadedFile) => {
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      }),
    });
  };

  processUpload = (uploadedFile) => {
    // object html to a form data object
    const data = new FormData();

    // file key in the backend, file attribute in the frontend, file name in the frontend
    data.append("file", uploadedFile.file, uploadedFile.name);

    api
      .post("posts", data, {
        // to feed the progress bar and monitore the request
        onUploadProgress: (e) => {
          const progress = parseInt(Math.round((e.loaded * 100) / e.total));
          this.updateFile(uploadedFile.id, {
            progress,
          });
        },
      })
      .then((response) => {
        // get all data from the response
        this.updateFile(uploadedFile.id, {
          uploaded: true,
          id: response.data._id,
          url: response.data.url,
        });
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true,
        });
      });
  };

  render() {
    const { uploadedFiles } = this.state;
    console.log(uploadedFiles);

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}
