import React from 'react';
import './Nav.css';
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="Nav">
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem"
        }}
      >
        <Link to="/login">Login</Link> |{" "}
        <Link to="/locations">Locations</Link>
      </nav>
    </div>
  );
}

export default Nav;
