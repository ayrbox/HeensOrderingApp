import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="container">
    <p className="float-right">
      <Link to="/">Back to top</Link>
    </p>
    <p>
      &copy; {new Date().getFullYear()} Heens·
      <Link to="/">Privacy</Link>.
      <Link to="/">Terms</Link>
    </p>
  </footer>
);

export default Footer;
