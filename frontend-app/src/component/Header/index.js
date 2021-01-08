import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Index() {
  return (
    <div className="header_container">
      <div className="link_container">
        <Link to="/">Result Book</Link>
        <Link to="/records">All records</Link>
      </div>
    </div>
  );
}

export default Index;
