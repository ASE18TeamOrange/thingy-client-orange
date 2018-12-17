import React from "react";
import PropTypes from "prop-types";

import {Card} from "../Common/Common";
import {CardChartView} from "./EnvironmentCards";
import "./styles.css";
import EnvironmentService from "./EnvironmentService";
import envClient from "../../thingyapi/EnvironmentSensorClient";

class Environment extends React.Component {
  constructor(props) {
    super(props);

    this.service = new EnvironmentService();
    this.service.setClient(envClient);
    this.service.setEnvironment(this);

    this.state = {
      temperature: props.temperature,
      pressure: props.pressure,
      co2: props.co2,
      humidity: props.humidity,
      color: props.color,
    };

    this.changeTab = props.changeTab;

    if (localStorage.getItem("log_temp") === "true")
      this.service.readingRoutine("temperature");
    if (localStorage.getItem("log_pressure") === "true")
      this.service.readingRoutine("pressure");
    if (localStorage.getItem("log_humidity") === "true")
      this.service.readingRoutine("humidity");
    if (localStorage.getItem("log_gas") === "true")
      this.service.readingRoutine("gas");
  }

  pressureUpdate(value) {
    this.setState({
      pressure: value,
    });
  }

  temperatureUpdate(value) {
    this.setState({
      temperature: value,
    });
  }

  gasUpdate(value) {
    this.setState({
      co2: value,
    });
  }

  humidityUpdate(value) {
    this.setState({
      humidity: value,
    });
  }

  lightUpdate(value) {
    this.setState({
      color: value,
    });
  }

  render() {
    return (
      <div>
        <Card name="temperature" changeTab={this.changeTab}>
          {<CardChartView feature={this.state.temperature} unit={"Celsius"} />}
        </Card>
        <Card name="humidity" changeTab={this.changeTab}>
          {<CardChartView feature={this.state.humidity} unit={"Rh"} />}
        </Card>
        <Card name="pressure" changeTab={this.changeTab}>
          {<CardChartView feature={this.state.pressure} unit={"Pa"} />}
        </Card>
        <Card name="CO2" changeTab={this.changeTab}>
          {<CardChartView feature={this.state.co2} unit={"ppmv"}/>}
        </Card>
      </div>
    );
  }
}

Environment.propTypes = {
  temperature: PropTypes.object,
  pressure: PropTypes.object,
  humidity: PropTypes.object,
  co2: PropTypes.object,
  color: PropTypes.object,
  changeTab: PropTypes.func,
};

export default Environment;
