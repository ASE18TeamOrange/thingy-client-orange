import React from "react";
import {Redirect} from "react-router";
import userClient from "../../thingyapi/UserClient";
import {NavLink} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
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
    this.userClient.loginUser(this.state.login, this.state.password, this.loginResult.bind(this));
  }

  loginResult(data, response) {
    if (response.statusCode === 200) {
      localStorage.setItem("user", this.state.login);
      localStorage.setItem("password", this.state.password);
      localStorage.setItem("token", data.token);
      window.location.reload();
    } else {
      alert(data.message);
    }
  }

  render() {
    return (
      <div id="account">
        <h3>Login</h3>
        <div className="box">
          <form>
            <fieldset className="box">
              <label>Name: </label> <input
                type="text"
                onChange={(event) => {
                  this.updateUsername(event.target.value);
                }}
                value={this.state.login}
              /><br/>
              <label>Password: </label> <input
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
        <div>
          <ul>
            <li>
              <NavLink to="/home">Home</NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Login;
