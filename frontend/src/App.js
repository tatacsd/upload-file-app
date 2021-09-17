import React, { Component } from "react";
import { uniqueId } from "lodash";
import fileSize from "filesize";

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
  };

  render() {
    const { uploadedFiles } = this.state;

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
