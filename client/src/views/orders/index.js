import React, { Component } from "react";

import Header from "../viewcomponents/Header";
import Footer from "../viewcomponents/Footer";

class OrderIndex extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <Header title="Heens" />

        <h1>Orders</h1>

        <Footer />
      </div>
    );
  }
}

export default OrderIndex;
