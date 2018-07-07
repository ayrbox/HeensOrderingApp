import React, { Component } from "react";
import Footer from "./Footer";
import Header from "./Header";

class MainLayout extends Component {
  render() {
    return (
      <div className="app-container">
        <Header title="Heens" />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}

export default MainLayout;
