import React from "react";
import "./styles.css";
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import userClient from "../../thingyapi/UserClient";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.userClient = userClient;
    this.state = {
      login: localStorage.getItem("user"),
      password: localStorage.getItem("password"),
      thingy: localStorage.getItem("thingy"),
      fireRedirect: false,
    };
    this.getProfile = this.getProfile.bind(this);
  }

  async getProfile() {
    try {
      this.getUserProfile();
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    this.userClient.logoutUser(this.state.login, this.state.password, this.logoutResult, localStorage.getItem("token"));
  }

  logoutResult(data, response) {
    localStorage.clear();
    window.location.reload();
  }

  getUserProfile() {
    this.userClient.getUserProfile(this.state.login, this.getUserProfileResult, localStorage.getItem("token"));
  }

  getUserProfileResult(data, response) {
    console.log(data);
    alert(data);
  }

  submitThingyName() {
    this.userClient.setThingy(this.state.login, this.state.thingy, this.setThingyResult.bind(this), localStorage.getItem("token"));
  }

  setThingyResult(data, response) {
    console.log(data);
    alert(data);
  }

  updateThingy(value) {
    this.setState({
      thingy: value,
    });
  }

  deleteAccount() {
    this.userClient.deleteUser(this.state.login, this.state.password, this.deleteResult.bind(this), localStorage.getItem("token"));
  }

  deleteResult(data, response) {
    localStorage.clear();
    window.location.reload();
  }

  render() {
    const redirect = localStorage.getItem("user") === "" || localStorage.getItem("user") === null ? (<Redirect to={{
      pathname: "/home",
    }} push={true}/>) : "";
    return (
      <div id="account">
        <h3>Wellcome back into you Account {this.state.login}</h3>
        <div className="box">
          <p>To connect to your thingy, submit its name here:</p>
          <form>
            <label>Name: </label>
            <input
              type="text"
              onChange={(event) => {
                this.updateThingy(event.target.value);
              }}
              value={this.state.thingy}
            /><br/>
            <button onClick={(e) => {
              e.preventDefault();
              this.submitThingyName();
            }}>Submit
            </button>
          </form>
        </div>
        <div className="buttonWrapper">
          <div id="logout">
            <button onClick={(e) => {
              e.preventDefault();
              this.logout();
            }}>Logout
            </button >
          </div>
          <div id="delete">
            <button onClick={(e) => {
              e.preventDefault();
              this.deleteAccount();
            }}>Delete Account
            </button>
          </div>
        </div>
        {redirect}
      </div>
    );
  }
}

Account.propTypes = {
  authenticated: PropTypes.bool,
  login: PropTypes.string,
};

export default Account;
