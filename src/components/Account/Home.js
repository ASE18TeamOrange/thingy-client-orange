import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      standardApiUrl: "http://localhost:8081/",
    };
  }

  updateApiUrl(value) {
    this.setState({
      standardApiUrl: value,
    });
    //localStorage.setItem("apiUrl", value);
  }

  render() {
    return (
      <div id="account">
        <h3>Wellcome, Orange Thingy API Webapp</h3>
        <h4>Configuration</h4>
        <div className="box">
          <p>please write the Orange Thingy API</p>
          <label>Url: </label> <input
            type="text"
            onChange={(event) => {
              this.updateApiUrl(event.target.value);
            }}
            value={this.state.standardApiUrl}
          /><br/>
        </div>
        <h4>please subscribe for a new account or login</h4>
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
