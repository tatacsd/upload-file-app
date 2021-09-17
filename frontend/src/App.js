import React, { Component } from "react";
import GlobalStyle from "./styles/global";
import { Container, Content } from "./styles";
import Upload from "./components/Upload";

export default class App extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Upload />
        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}
