import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound() {
  return (
    <div className="not-found">
      <h2>Sorry, but the page could not be found.</h2>
      <p>The requested page does not exist or has been moved.</p>
      <Link to="/" className="home-link">
        Back to Homepage
      </Link>
    </div>
  );
}

export default PageNotFound;
