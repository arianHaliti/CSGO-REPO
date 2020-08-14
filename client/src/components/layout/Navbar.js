import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar-fixed" style={{ marginBottom: "65px" }}>
      <nav>
        <div className="nav-wrapper #263238 blue-grey darken-4">
          <Link to="/">
            <img
              className="logo-img"
              src={require("../../assets/csgo-repo.png")}
            />
          </Link>
          <Link to="/" className="brand-logo brand-logo-name">
            CS REPO
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/inventory">Inventory</Link>
            </li>
            <li>
              <Link to="/development">Development</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
          </ul>
        </div>

        <div className="nav-content #424242 grey darken-3">
          <ul className="tabs tabs-transparent">
            <li className="tab">
              <a href="/#">Test 1</a>
            </li>
            <li className="tab">
              <a className="active" href="/#">
                Test 2
              </a>
            </li>
            <li className="tab disabled">
              <a href="/#">Disabled Tab</a>
            </li>
            <li className="tab">
              <a href="/#">Test 4</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};
Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "CSGOREPO",
};
export default Navbar;
