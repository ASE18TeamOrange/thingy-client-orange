"use strict";
import React from "react";
import "./styles.css";
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import userClient from "../../thingyapi/UserClient";
import envClient from "../../thingyapi/EnvironmentSensorClient";
import VocalCommandHandler from "../VocalCommand/VocalCommandHandler";

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new window.SpeechRecognition();

recognition.continous = false;
recognition.interimResults = false;
recognition.lang = "en-US";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.userClient = userClient;
    this.envClient = envClient;

    this.toggleListen = this.toggleListen.bind(this);
    this.handleListen = this.handleListen.bind(this);
    this.vocalCommandHandler = new VocalCommandHandler();

    this.log_temp = (localStorage.getItem("log_temp") === "true");
    this.log_pressure = (localStorage.getItem("log_pressure") === "true");
    this.log_humidity = (localStorage.getItem("log_humidity") === "true");
    this.log_gas = (localStorage.getItem("log_gas") === "true");

    this.state = {
      login: localStorage.getItem("user"),
      password: localStorage.getItem("password"),
      thingy: localStorage.getItem("thingy"),
      id: localStorage.getItem("id"),
      fireRedirect: false,
      log_temp: this.log_temp,
      log_pressure: this.log_pressure,
      log_humidity: this.log_humidity,
      log_gas: this.log_gas,
      log_light: this.log_light,
      avg_temp: "",
      avg_pressure: "",
      avg_humidity: "",
      avg_gas: "",
      avg_result: "",
      listening: false,
    };

    // if (this.state.id === undefined || this.state.id === "") {
    this.getProfile().then(() => {
      console.log("done");
    });
    // }
  }

  async getProfile() {
    try {
      this.getUserProfile();
    } catch (e) {
      console.log(e);
    }
  }

  toggleActiveInactive(key) {
    const item = localStorage.getItem(key);
    if (item === null || item === "" || item === undefined) {
      localStorage.setItem(key, "true");
    } else if (item === "true") {
      localStorage.setItem(key, "false");
    } else if (item === "false") {
      localStorage.setItem(key, "true");
    }
  }

  setItem(key, value) {
    localStorage.setItem(key, value);
  }

  logout() {
    try {
      this.userClient.logoutUser(this.state.login, this.state.password, this.logoutResult.bind(this), localStorage.getItem("token"));
    } catch (e) {
      localStorage.clear();
      window.location.reload();
    }
  }

  logoutResult(data, response) {
    localStorage.clear();
    window.location.reload();
  }

  getUserProfile() {
    try {
      this.userClient.getUserProfile(this.state.login, this.getUserProfileResult.bind(this), localStorage.getItem("token"));
    } catch (e) {
      console.log(e);
    }
  }

  getUserProfileResult(data, response) {
    this.checkResponseStatusCode(response);
    localStorage.setItem("login", data.login);
    localStorage.setItem("id", data.id);
    localStorage.setItem("thingy", data.thingy);

    this.setState({
      id: data.id,
      thingy: data.thingy,
      login: data.login,
    });
  }

  checkResponseStatusCode(response) {
    if (response.statusCode >= 400) {
      localStorage.clear();
      window.location.reload();
    }
  }

  submitThingyName() {
    this.userClient.setThingy(this.state.login, this.state.thingy, this.setThingyResult.bind(this), localStorage.getItem("token"));
  }

  setThingyResult(data, response) {
    alert(data.message);
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

  tempOff() {
    this.setItem("log_temp", "false");
    this.setState({
      log_temp: false,
    });
  }

  pressureOff() {
    this.setItem("log_pressure", "false");
    this.setState({
      log_pressure: false,
    });
  }

  humidityOff() {
    this.setItem("log_humidity", "false");
    this.setState({
      log_humidity: false,
    });
  }

  gasOff() {
    this.setItem("log_gas", "false");
    this.setState({
      log_gas: false,
    });
  }

  averageTemp(data, response) {
    this.checkResponseStatusCode(response);
    let sum = 0
    for (let i = 0; i < data.length; i++){
      sum += data[i].temperature;
    }
    const avg = Math.round(sum/data.length);
    const text = "rounded average:" + avg + " degree"
    this.setState({
      avg_result: avg + " degree",
    });
    this.speak(text);
  }
  averagePressure(data, response) {
    this.checkResponseStatusCode(response);
    let sum = 0
    for (let i = 0; i < data.length; i++){
      sum += data[i].pressure;
    }
    const avg = Math.round(sum/data.length);
    const text = "rounded average:" + avg + " pascal";
    this.setState({
      avg_result: avg + " pascal",
    });
    this.speak(text);
  }
  averageHumidity(data, response) {
    this.checkResponseStatusCode(response);
    let sum = 0
    for (let i = 0; i < data.length; i++){
      sum += data[i].humidity;
    }
    const avg = Math.round(sum/data.length);
    const text = "rounded average:" + avg + " of relative humidity"
    this.setState({
      avg_result: avg + " rh",
    });
    this.speak(text);
  }

  averageGas(data, response) {
    this.checkResponseStatusCode(response);
    let sum = 0
    for (let i = 0; i < data.length; i++){
      sum += data[i].gas.eco2;
    }
    const avg = Math.round(sum/data.length);
    const text = "rounded average:" + avg + " ppmv"
    this.setState({
      avg_result: avg + " ppmv",
    });

    this.speak(text);
  }

  speak(text) {
    this.utterance = new SpeechSynthesisUtterance(text);
    this.utterance.lang = "en-US";
    this.utterance.rate = 1;
    this.utterance.pitch = 1;
    this.utterance.volume = 2;
    window.speechSynthesis.speak(this.utterance);
  }

  logTemperature() {
    this.envClient.logTemperature("temperature", this.state.login, this.state.password, localStorage.getItem("token"), this.logTemperatureResult.bind(this));
  }

  logTemperatureResult(data, response) {
    this.toggleActiveInactive("log_temp");
    this.setState({
      log_temp: true,
    });
  }

  logHumidity() {
    this.envClient.logHumidity("humidity", this.state.login, this.state.password, localStorage.getItem("token"), this.logHumidityResult.bind(this));
  }

  logHumidityResult(data, response) {
    this.toggleActiveInactive("log_humidity");
    this.setState({
      log_humidity: true,
    });
  }

  logGas() {
    this.envClient.logGas("gas", this.state.login, this.state.password, localStorage.getItem("token"), this.logGasResult.bind(this));
  }

  logGasResult(data, response) {
    this.toggleActiveInactive("log_gas");
    this.setState({
      log_gas: true,
    });
  }

  logLight() {
    this.envClient.logLight("light", this.state.login, this.state.password, localStorage.getItem("token"), this.logLightResult.bind(this));
  }

  logLightResult(data, response) {
    this.toggleActiveInactive("log_light");
    this.setState({
      log_light: true,
    });
  }

  logPressure() {
    this.envClient.logPressure("pressure", this.state.login, this.state.password, localStorage.getItem("token"), this.logPressureResult.bind(this));
  }

  logPressureResult(data, response) {
    this.toggleActiveInactive("log_pressure");
    this.setState({
      log_pressure: true,
    });
  }


  getTemperature() {
    this.envClient.getTemperature("temperature", this.state.login, this.state.password, localStorage.getItem("token"), this.getTemperatureResult.bind(this));
  }

  getTemperatureResult(data, response) {
    console.log(data);
  }

  getHumidity() {
    this.envClient.getHumidity("humidity", this.state.login, this.state.password, localStorage.getItem("token"), this.getHumidityResult.bind(this));
  }

  getHumidityResult(data, response) {
    console.log(data);
  }

  getGas() {
    this.envClient.getGas("gas", this.state.login, this.state.password, localStorage.getItem("token"), this.getGasResult.bind(this));
  }

  getGasResult(data, response) {
    console.log(data);
  }

  getLight() {
    this.envClient.getLight("light", this.state.login, this.state.password, localStorage.getItem("token"), this.getLightResult.bind(this));
  }

  getLightResult(data, response) {
    console.log(data);
  }

  getPressure() {
    this.envClient.getPressure("pressure", this.state.login, this.state.password, localStorage.getItem("token"), this.getPressureResult.bind(this));
  }

  getPressureResult(data, response) {
    console.log(data);
  }


  deleteLogTemperature() {
    this.envClient.deleteLogTemperature("temperature", this.state.login, this.state.password, localStorage.getItem("token"), this.deleteLogTemperatureResult.bind(this));
  }

  deleteLogTemperatureResult(data, response) {
    this.toggleActiveInactive("log_temp");
    this.setState({
      log_temp: false,
    });
  }

  deleteLogHumidity() {
    this.envClient.deleteLogHumidity("humidity", this.state.login, this.state.password, localStorage.getItem("token"), this.deleteLogHumidityResult.bind(this));
  }

  deleteLogHumidityResult(data, response) {
    this.toggleActiveInactive("log_humidity");
    this.setState({
      log_humidity: false,
    });
  }

  deleteLogGas() {
    this.envClient.deleteLogGas("gas", this.state.login, this.state.password, localStorage.getItem("token"), this.deleteLogGasResult.bind(this));
  }

  deleteLogGasResult(data, response) {
    this.toggleActiveInactive("log_gas");
    this.setState({
      log_gas: false,
    });
  }

  deleteLogLight() {
    this.envClient.deleteLogLight("light", this.state.login, this.state.password, localStorage.getItem("token"), this.deleteLogLightResult.bind(this));
  }

  deleteLogLightResult(data, response) {
    this.toggleActiveInactive("log_light");
    this.setState({
      log_light: false,
    });
  }

  deleteLogPressure() {
    this.envClient.deleteLogPressure("pressure", this.state.login, this.state.password, localStorage.getItem("token"), this.deleteLogPressureResult.bind(this));
  }

  deleteLogPressureResult(data, response) {
    this.toggleActiveInactive("log_pressure");
    this.setState({
      log_pressure: false,
    });
  }

  toggleListen() {
    this.setState({
      listening: !this.state.listening,
    }, this.handleListen);
  }


  handleListen() {
    try {
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
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + " ";
        }

        const transcriptArr = finalTranscript.split(" ");
        const stopCmd = transcriptArr.slice(-3, -1);
        console.log("command", stopCmd);

        let command = stopCmd[0];
        try {
          const second = stopCmd[1];
          if (typeof second !== "undefined")
            command = command + " " + second;
        } catch (e) { }

        if (this.vocalCommandHandler.valid(command)) {
          recognition.stop();
          try {
            document.getElementById("final").innerHTML = command;
          } catch (e) {}
          this.vocalCommandHandler.handle(
            command,
            localStorage.getItem("user"),
            localStorage.getItem("password"),
            localStorage.getItem("token"), this);
        } else {
          try {
            //document.getElementById("final").innerHTML = command;
          } catch (e) {}
        }

      };
    } catch (e) { }
  }


  render() {
    const redirect = localStorage.getItem("user") === "" || localStorage.getItem("user") === null ? (<Redirect to={{
      pathname: "/home",
    }} push={true}/>) : "";
    const t = localStorage.getItem("thingy");
    const activateSensors = t !== null && t !== "" && t !== undefined ? (
      <div className="box card">
        <ul>
          <li>
            <span>Sensors</span>
          </li>
        </ul>
        <div className="box card_content_container">
          <form>
            <button id="temp" className={this.state.log_temp ? "active":""} onClick={(e) => {
              e.preventDefault();
              if (!this.state.log_temp)
                this.logTemperature();
              else this.deleteLogTemperature();
            }}>Temperature
            </button>
            <button id="humidity" className={this.state.log_humidity ? "active":""} onClick={(e) => {
              e.preventDefault();
              if (!this.state.log_humidity)
                this.logHumidity();
              else this.deleteLogHumidityResult();
            }}>Humidity
            </button>
            <button id="pressure" className={this.state.log_pressure ? "active":""} onClick={(e) => {
              e.preventDefault();
              if (!this.state.log_pressure)
                this.logPressure();
              else this.deleteLogPressure();
            }}>Pressure
            </button>
            <button id="gas" className={this.state.log_gas ? "active":""} onClick={(e) => {
              e.preventDefault();
              if (!this.state.log_gas)
                this.logGas();
              else this.deleteLogGas();
            }}>Gas
            </button>
          </form>
        </div>
      </div>
    ) : "";


    return (
      <div id="account">
        <h2>Hoi <b>{this.state.login}</b>, wellcome back into your account</h2>
        <div className="card">
          <ul>
            <li>
              <span>Profile</span>
            </li>
          </ul>

          <div className="box card_content_container">

            <ul>
              <li>Username: {this.state.login}</li>
              <li>Thingy: {this.state.thingy}</li>
              <li>Id: {this.state.id}</li>
            </ul>
          </div>
        </div>

        <div className="box card">
          <ul>
            <li>
              <span>Thingy ID</span>
            </li>
          </ul>
          <div className="box card_content_container">
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
        </div>

        <div className="box card">
          <ul>
            <li>
              <span>Voice Control</span>
            </li>
          </ul>
          <div className="box card_content_container">
            <div style={container}>
              <div className="box">
                <button id='microphone-btn' style={button} onClick={this.toggleListen}/>
                <div id='final' style={final}>&nbsp;</div>
                <p>{this.state.avg_result}</p>
              </div>
            </div>
          </div>
        </div>

        {activateSensors}

        <div className="box">
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
        </div>
        {redirect}
      </div>
    );
  }
}

Account.propTypes = {
  login: PropTypes.string,
};

export default Account;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  button: {
    width: "40px",
    height: "40px",
    background: "#008CBA",
    borderRadius: "50%",
  },
  final: {
    color: "black",
    border: "#ccc 1px solid",
    padding: "0.5em",
    margin: "0.5em",
    width: "100px",
  },
};

const {container, button, final} = styles;
