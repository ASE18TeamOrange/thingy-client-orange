import React from "react";
import "./styles.css";
import {Redirect} from "react-router";
import PropTypes from "prop-types";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.authenticated = false;//props.authenticated;
    this.state = {
      popupOpen: false,
      username: "foo",
      fireRedirect: !this.authenticated,
    };
  }
  render() {
    return (
      <div id="account">
        <h3>Wellcome back {this.state.username}</h3>
        {this.state.fireRedirect && <Redirect to={{
          pathname: "/subscription",
        }} push={true}/>}
      </div>
    );
  }
}

Account.propTypes = {
  authenticated: PropTypes.bool,
};

export default Account;
