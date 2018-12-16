import React from "react";
import Popup from "./Popup";
import Name from "./Name";
import namelabel from "../../assets/namelabel.png";
import advertising from "../../assets/advertising.png";
import connection from "../../assets/connection.png";
import eddystone from "../../assets/eddystone.png";
import cloudtoken from "../../assets/cloudtoken.png";
import environment from "../../assets/environment.png";
import motion from "../../assets/motion.png";
import ifttt from "../../assets/ifttt.png";
import AdvertisingParams from "./AdvertisingParams";
import ConnectionParams from "./ConnectionParams";
import Eddystone from "./Eddystone";
import CloudToken from "./CloudToken";
import Ifttt from "./Ifttt";
import EnvironmentSensors from "./EnvironmentSensors";
import MotionSensorIntervals from "./MotionSensorIntervals";
import "./styles.css";

class Configuration extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      popupOpen: false,
    };
  }

  componentDidMount() {
    this.props.getIFTTTkey();
    this.props.readName();
    this.props.readAdvertisingParams();
    this.props.readConnectionParams();
    this.props.readEddystoneURL();
    this.props.readCloudToken();
    this.props.readEnvironmentConfig();
    this.props.readMotionConfig();
  }

  componentWillReceiveProps(np) {
    if (np.advertisingparameters !== this.state.advertisingparameters) {
      this.setState({
        advertisingparameters: np.advertisingparameters,
      });
    }

    if (np.connectionparameters !== this.state.connectionparameters) {
      this.setState({
        connectionparameters: np.connectionparameters,
      });
    }

    if (np.eddystone !== this.state.eddystone) {
      this.setState({
        eddystone: np.eddystone,
      });
    }

    if (np.cloudtoken !== this.state.cloudtoken) {
      this.setState({
        cloudtoken: np.cloudtoken.token,
      });
    }

    if (np.environmentconfiguration !== this.state.environmentconfiguration) {
      this.setState({
        environmentconfiguration: np.environmentconfiguration,
      });
    }

    if (np.motionconfiguration !== this.state.motionconfiguration) {
      this.setState({
        motionconfiguration: np.motionconfiguration,
      });
    }

    if (np.iftttKey!== this.state.iftttKey) {
      this.setState({
        iftttKey: np.iftttKey,
      });
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value});
  }

  handleAdvertisingChange(advertisingparameters) {
    this.setState({
      advertisingparameters,
    });
  }

  handleConnectionChange(connectionparameters) {
    this.setState({
      connectionparameters,
    });
  }

  handleEddystoneChange(eddystone) {
    this.setState({
      eddystone,
    });
  }

  handleCloudtokenChange(cloudtoken) {
    this.setState({
      cloudtoken,
    });
  }

  handleEnvironmentChange(environmentconfiguration) {
    this.setState({
      environmentconfiguration,
    });
  }

  handleMotionChange(motionconfiguration) {
    this.setState({
      motionconfiguration,
    });
  }

  handleIFTTTChange(ifttt) {
    this.setState({
      ifttt,
    });
  }

  // -----


  handleNameSubmit() {
    this.props.writeName(this.state.name);
  }

  handleAdvertisingSubmit() {
    this.props.writeAdvertisingParams(this.state.advertisingparameters);
  }

  handleConnectionSubmit() {
    this.props.writeConnectionParams(this.state.connectionparameters);
  }

  handleEddystoneSubmit() {
    this.props.writeEddystoneURL(this.state.eddystone.href);
  }

  handleCloudtokenSubmit() {
    this.props.writeCloudToken(this.state.cloudtoken);
  }

  handleEnvironmentSubmit() {
    this.props.writeEnvironmentConfig(this.state.environmentconfiguration);
  }

  handleMotionSubmit() {
    this.props.writeMotionConfig(this.state.motionconfiguration);
  }

  handleIFTTTSubmit() {
    this.props.setIFTTTKey(this.state.ifttt);
  }

  openPopup(content) {
    let c;
    let oc;
    switch (content) {

    case "connection":
      c = <ConnectionParams connectionparameters={this.props.connectionparameters} onChange={this.handleConnectionChange.bind(this)}/>;
      oc = this.handleConnectionSubmit.bind(this);
      break;


    case "environment":
      c = <EnvironmentSensors environmentconfiguration={this.props.environmentconfiguration} onChange={this.handleEnvironmentChange.bind(this)} />;
      oc = this.handleEnvironmentSubmit.bind(this);
      break;


    default:
      c = null;
      oc = () => {};
      break;
    }

    this.setState((ps) => ({
      ...ps,
      content: c,
      popupOpen: true,
      onConfirm: oc,
    }));
  }

  closePopup() {
    this.setState({
      popupOpen: false,
    });
  }

  render() {
    return (
      <div id="configuration">
        <h3> Configuration </h3>
        <span id="firmwareLabel">{`Firmware version ${this.props.firmware}`}</span>
        <p className="component" onClick={() => this.openPopup("connection")}><img src={connection} alt="name" />Connection parameters</p>
        <p className="component" onClick={() => this.openPopup("environment")}><img src={environment} alt="name" />Environment sensors</p>

        {
          this.state.popupOpen ? (
            <Popup onClose={this.closePopup.bind(this)} onConfirm={this.state.onConfirm.bind(this)}>
              {
                this.state.content
              }
            </Popup>
          )
            :
            null
        }
      </div>
    );
  }
}

export default Configuration;
