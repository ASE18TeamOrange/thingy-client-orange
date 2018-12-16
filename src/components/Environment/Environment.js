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

    this.service.readingRoutine("temperature");
    this.service.readingRoutine("pressure");
    this.service.readingRoutine("humidity");
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

  componentDidMount() {
    this.props.toggleAll("on");
  }

  componentWillUnmount() {
    this.props.toggleAll("off");
  }

  render() {
    return (
      <div>
        <Card name="temperature" changeTab={this.changeTab}>
          {<CardChartView feature={this.state.temperature} />}
        </Card>

        <Card name="pressure" changeTab={this.changeTab}  >
          { <CardChartView feature={this.state.pressure} />}

        </Card>

        <Card name="humidity" changeTab={this.changeTab}  >
          { <CardChartView feature={this.state.humidity} />}

        </Card>

        <Card name="CO2" interactionName="co2" changeTab={this.changeTab} >
          { <CardChartView feature={this.state.co2} />}

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
