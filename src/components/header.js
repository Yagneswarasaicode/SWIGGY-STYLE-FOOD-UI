import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        <div className="logo-mark">🍽</div>
        <span className="logo-text">SWIGGY<span>UI</span></span>
      </Link>

      <nav className="nav-items">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>
            <button
              className="nav-cta"
              onClick={() => setLoggedIn(!loggedIn)}
            >
              {loggedIn ? "Sign Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
