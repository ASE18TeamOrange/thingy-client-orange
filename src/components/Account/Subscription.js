import React from "react";
import {Route, Redirect} from "react-router";
import userClient from "../../thingyapi/UserClient";
import {NavLink} from "react-router-dom";

class Subscription extends React.Component {
  constructor(props) {
    super(props)
    this.userClient = userClient;
    this.state = {
      login: "",
      password: "",
      fireRedirect: false,
    };
  }

  updateUsername(value) {
    this.setState({
      login: value,
    });
  }

  updatePassword(value) {
    this.setState({
      password: value,
    });
  }

  submit() {
    this.userClient.registerUser(this.state.login, this.state.password, this.subscribe.bind(this));
  }

  subscribe(data, response) {
    alert(data.message);
    this.setState({
      fireRedirect: true,
    });
  }

  render() {
    const redirect = this.state.fireRedirect ? (<Redirect to={{
      pathname: "/login",
    }} push={true}/>) : "";
    return (
      <div className="card" id="account">
        <ul>
          <li>
            <span>Signup for a new account</span>
          </li>
        </ul>
        <div className="box card_content_container">
          <form>
            <fieldset className="box">
              <label>Name:</label> <input
                type="text"
                onChange={(event) => {
                  this.updateUsername(event.target.value);
                }}
                value={this.state.login}
              /><br/>
              <label>Password:</label> <input
                type="password"
                onChange={(event) => {
                  this.updatePassword(event.target.value);
                }}
              /><br/>
            </fieldset>
            <div className="box">
              <button onClick={(e) => {
                e.preventDefault();
                this.submit();
              }}>Submit
              </button>
            </div>
          </form>
        </div>
        {redirect}
      </div>
    );
  }
}

export default Subscription;
