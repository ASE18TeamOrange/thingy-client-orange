import React from "react";
import PropTypes from "prop-types";
import {Card} from "../Common/Common";
import "./styles.css";

class VocalCommand extends React.Component {
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
            <div id="voice_command">
                <h3> Voice Command </h3>
                <p> Hello World </p>
            </div>
        );
    }
}

export default VocalCommand;
