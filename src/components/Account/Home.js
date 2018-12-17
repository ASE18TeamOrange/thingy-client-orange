import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import {NavLink} from "react-router-dom";

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
    localStorage.setItem("apiUrl", value);
  }

  render() {
    return (
      <div id="account">
        <h3>Wellcome, Orange Thingy API Webapp</h3>
        <div className="card">
          <ul>
            <li>
              <span>Please subscribe for a new account or login</span>
            </li>
          </ul>
          <div className="box card_content_container">
            <ul>
              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
              <li>
                &nbsp;
              </li>
              <li>
                <NavLink to="/subscribe">Subscribe</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="card">
          <ul>
            <li>
              <span>API Url</span>
            </li>
          </ul>
          <div className="box card_content_container">
            <p>Orange Thingy API is set to</p>
            <label>Url: </label>
            <input
            type="text"
            onChange={(event) => {
              this.updateApiUrl(event.target.value);
            }}
            value={this.state.standardApiUrl}
            /><br/>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  login: PropTypes.string,
};

export default Home;
