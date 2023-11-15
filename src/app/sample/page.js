"use client";
import React, { Component } from "react";
import logger from "logging-library";
import FileViewer from "react-file-viewer";
// import { CustomErrorComponent } from "custom-error";

const file = "http://example.com/image.png";
const type = "png";

export default class MyComponent extends Component {
  render() {
    return (
      <FileViewer
        fileType={type}
        filePath={file}
        // errorComponent={CustomErrorComponent}
        onError={this.onError}
      />
    );
  }

  onError(e) {
    logger.logError(e, "error in file-viewer");
  }
}
