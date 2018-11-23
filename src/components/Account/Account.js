import React from "react";
import PropTypes from "prop-types";
import {Card} from "../Common/Common";
import "./styles.css";

class Account extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            popupOpen: false,
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(np) {

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
                <p> Hello World </p>
            </div>
        );
    }
}

export default Account;
