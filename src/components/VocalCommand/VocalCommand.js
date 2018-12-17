"use strict";
import React from "react";
import VocalCommandHandler from "./VocalCommandHandler";
import PropTypes from "prop-types";

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.continous = true;
recognition.interimResults = true;
recognition.lang = "en-US";

class VocalCommand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listening: false,
    };
    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.vocalCommandHandler = new VocalCommandHandler();
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening,
    }, this.handleListen);
  }

  handleListen() {
    console.log("listening?", this.state.listening);

    if (this.state.listening) {
      recognition.start();
      recognition.onend = () => {
        console.log("...continue listening...");
        recognition.start();
      };
    } else {
      recognition.stop();
      recognition.onend = () => {
        console.log("Stopped listening per click");
      };
    }

    recognition.onstart = () => {
      console.log("Listening!");
    };

    let finalTranscript = "";
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
        }
      }

      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) finalTranscript += transcript + " ";
        else interimTranscript += transcript;
      }


      document.getElementById("interim").innerHTML = interimTranscript;
      document.getElementById("final").innerHTML = finalTranscript;
      // -------------------------COMMANDS------------------------------------

      const transcriptArr = finalTranscript.split(" ");
      const stopCmd = transcriptArr.slice(-3, -1);
      console.log("stopCmd", stopCmd);

      if (this.vocalCommandHandler.valid(stopCmd[0])) {
        this.vocalCommandHandler.handle(
          stopCmd[0],
          localStorage.getItem("user"),
          localStorage.getItem("password"),
          localStorage.getItem("token"), this.result.bind(this));
      }

      if (stopCmd[0] === "stop" && stopCmd[1] === "listening") {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per command");
          const finalText = transcriptArr.slice(0, -3).join(" ");
          document.getElementById("final").innerHTML = finalText;
        };
      }
    };
  }

  result(data, response) {
    console.log(data.message);
  }

  render() {
    return (
      <div style={container}>
        <div className="box">
          <button id='microphone-btn' style={button} onClick={this.toggleListen}/>
          <div id='interim' style={interim}>&nbsp;</div>
          <div id='final' style={final}>&nbsp;</div>
        </div>

      </div>
    );
  }
}

export default VocalCommand;

// -------------------------CSS------------------------------------

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: "30px",
    height: "30px",
    background: "lightblue",
    borderRadius: "50%",
  }
  ,
  interim: {
    color: "gray",
    border: "#ccc 1px solid",
    padding: "0.5em",
    margin: "0.5em",
    width: "100px",
  },
  final: {
    color: "black",
    border: "#ccc 1px solid",
    padding: "0.5em",
    margin: "0.5em",
    width: "100px",
  },
};

const {container, button, interim, final} = styles;
