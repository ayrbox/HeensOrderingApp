import React, { Component } from "react";

class ExternalLayout extends Component {
  render() {
    return <div className="app-container">{this.props.children}</div>;
  }
}

export default ExternalLayout;
