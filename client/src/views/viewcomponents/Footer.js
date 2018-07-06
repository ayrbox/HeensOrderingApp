import React from "react";
import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="container">
    <p className="float-right">
      <Link>Back to top</Link>
    </p>
    <p>
      &copy; {new Date().getFullYear()} Heens· <Link>Privacy</Link>.
      <Link>Terms</Link>
    </p>
  </footer>
);

export default Footer;
