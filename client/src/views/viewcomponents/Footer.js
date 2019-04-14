import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="container">
      <p className="float-right">
        <Link to="/">Back to top</Link>
      </p>
      <p>
        {`&copy; ${year} Heens·`}
        <Link to="/">Privacy</Link>
        <Link to="/">Terms</Link>
      </p>
    </footer>
  );
};

export default Footer;
