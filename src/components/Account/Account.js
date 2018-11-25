import React from "react";
import "./styles.css";

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpen: false,
    };
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  // -----

  handleNameSubmit() {
    this.props.writeName(this.state.name);
  }

  render() {
    return (
      <div id="account">
        <h3> Account </h3>
        <p> Hello World Account </p>
      </div>
    );
  }
}

export default Account;
