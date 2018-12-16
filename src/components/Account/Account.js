import React from "react";
import "./styles.css";
import {Redirect} from "react-router";
import PropTypes from "prop-types";
import userClient from "../../thingyapi/UserClient";
import envClient from "../../thingyapi/EnvironmentSensorClient";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.userClient = userClient;
    this.envClient = envClient;

    this.log_temp = (localStorage.getItem("log_temp") === "true");
    this.log_pressure = (localStorage.getItem("log_pressure") === "true");
    this.log_humidity = (localStorage.getItem("log_humidity") === "true");
    this.log_gas = (localStorage.getItem("log_gas") === "true");

    /*

          log_pressure: JSON.parse(localStorage.getItem("log_pressure")) === true,
      log_humidity: JSON.parse(localStorage.getItem("log_humidity")) === true,
      log_gas: JSON.parse(localStorage.getItem("log_gas")) === true,
      log_light: JSON.parse(localStorage.getItem("log_light")) === true,
     */
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

  logout() {
    this.userClient.logoutUser(this.state.login, this.state.password, this.logoutResult, localStorage.getItem("token"));
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
    if (response.statusCode === 401) {
      localStorage.clear();
      window.location.reload();
    }
    localStorage.setItem("login", data.login);
    localStorage.setItem("id", data.id);
    localStorage.setItem("thingy", data.thingy);

    this.setState({
      id: data.id,
      thingy: data.thingy,
      login: data.login,
    });
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
    this.setState({
      //get_temp: true,
    });
  }

  getHumidity() {
    this.envClient.getHumidity("humidity", this.state.login, this.state.password, localStorage.getItem("token"), this.getHumidityResult.bind(this));
  }

  getHumidityResult(data, response) {
    this.setState({
      //get_humidity: true,
    });
  }

  getGas() {
    this.envClient.getGas("gas", this.state.login, this.state.password, localStorage.getItem("token"), this.getGasResult.bind(this));
  }

  getGasResult(data, response) {
    this.setState({
      //get_gas: true,
    });
  }

  getLight() {
    this.envClient.getLight("light", this.state.login, this.state.password, localStorage.getItem("token"), this.getLightResult.bind(this));
  }

  getLightResult(data, response) {
    this.setState({
      //get_light: true,
    });
  }

  getPressure() {
    this.envClient.getPressure("pressure", this.state.login, this.state.password, localStorage.getItem("token"), this.getPressureResult.bind(this));
  }

  getPressureResult(data, response) {
    this.setState({
      //get_pressure: true,
    });
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

  render() {
    const redirect = localStorage.getItem("user") === "" || localStorage.getItem("user") === null ? (<Redirect to={{
      pathname: "/home",
    }} push={true}/>) : "";

    const t = localStorage.getItem("thingy");
    const activateSensors = t !== null && t !== "" && t !== undefined ? (<div className="box">
      <h3>Acquire sensors</h3>
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
    ) : "";


    return (
      <div id="account">
        <h2>Hoi <b>{this.state.login}</b>, wellcome back into your account</h2>

        <div className="box">
          <h3>Profile details</h3>
          <ul>
            <li>Username: {this.state.login}</li>
            <li>Thingy: {this.state.thingy}</li>
            <li>Id: {this.state.id}</li>
          </ul>
        </div>

        <div className="box">
          <h3>Submit thingy</h3>
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
  authenticated: PropTypes.bool,
  login: PropTypes.string,
};

export default Account;
