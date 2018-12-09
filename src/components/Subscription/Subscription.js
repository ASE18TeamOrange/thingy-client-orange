import React from "react";
import {Redirect} from "react-router";
import ThingyAPIClient from "../../thingyapi/ThingyAPIClient";

class Subscription extends React.Component {
  constructor(props) {
    super(props)
    this.userClient = new ThingyAPIClient().getUserClient();

    this.state = {
      username: "",
      password: "",
      fireRedirect: false,
    };
  }

  updateUsername(value) {
    this.setState({
      username: value,
    });
  }

  updatePassword(value) {
    this.setState({
      password: value,
    });
  }

  submit() {
    this.userClient.registerUser(this.state.username, this.state.password, this.subscribe);
  }

  subscribe(data, response) {
    console.log("funziona")
    console.log(data);
    console.log(response);
    return;
    if (!response.data.error) {
      console.log("successful subscription");
      this.setState({
        fireRedirect: true,
      });
    }
  }

  render() {
    return (
      <div>
        <form>
          <input
            type="text"
            onChange={(event) => {
              this.updateUsername(event.target.value)
            }}
            value={this.state.username}
          />
          <input
            type="password"
            onChange={(event) => {
              this.updatePassword(event.target.checked)
            }}
          />
          <button onClick={() => {
            this.submit()
          }}>Submit
          </button>
        </form>
        {this.state.fireRedirect && <Redirect to={{
          pathname: "/account",
          state: {usename: this.state.username},
        }} push={true}/>}
      </div>
    )
  }
}

export default Subscription;
