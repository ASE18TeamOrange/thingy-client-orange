import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: null,
    };
  }

  render() {
    return (
      <div id="account">
        <h3>Wellcome, please login into your account or subscribe</h3>
        <div className="box">
          <ul>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/subscribe">Subscribe</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  login: PropTypes.string,
};

export default Home;
