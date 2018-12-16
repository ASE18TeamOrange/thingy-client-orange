import React from "react";
import PropTypes from "prop-types";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import MediaQuery from "react-responsive";
import MenuItem from "material-ui/MenuItem";
import {ToastContainer, toast} from "react-toastify";
import Login from "../Account/Login";
import Subscription from "../Account/Subscription";
import Home from "../Account/Home";
import AccountContainer from "../../containers/AccountContainer";
import account from "../../assets/environment.png";
import home from "../../assets/environment.png";
import VocalCommandContainer from "../../containers/VocalCommandContainer";
import vocalcommand from "../../assets/environment.png";
import SpeechSynthContainer from "../../containers/SpeechSynthContainer";
import speechsynth from "../../assets/environment.png";
import EnvironmentContainer from "../../containers/EnvironmentContainer";
import Battery from "./Battery";
import environment from "../../assets/environment.png";
import BurgerMenu from "./BurgerMenu";
import {emojify} from "react-emojione";
import "./styles.css";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.token = localStorage.getItem("token");
    this.login = localStorage.getItem("user");

    this.state = {notification: props.notification, firmware: props.firmware};
    this.onConnectionEvent = this.onConnectionEvent.bind(this);
  }

  componentWillReceiveProps(np) {
    if (np.notification !== this.state.notification) {
      this.setState({
        notification: np.notification,
      });
      if (np.notification) {
        const type = np.notification.category;
        const message = np.notification.message;
        toast.dismiss();
        if (type === "success") {
          toast.success(message, {
            autoClose: 2000,
          });
        } else if (type === "info") {
          toast.info(message);
        } else if (type === "warning") {
          toast.warn(message);
        } else if (type === undefined) {
          toast.error("undefined error");
        } else {
          toast.error(message);
        }
      }
    }
  }

  onConnectionEvent(state) {
    this.props.onConnectionEvent(state);
    if (state) {
      this.props.readName();
      this.props.readFirmware();
      toast.info("Thingy connected");
      this.props.startErrorNotification();
      this.props.startDisconnectNotification();
      this.props.startWriteNotification();
      this.props.startBatteryNotification();
    } else {
      toast.info("Thingy disconnected");
    }
  }

  render() {
    let routes = "";
    let battery;
    let navigation = "";
    if (this.token !== null && this.token !== "") {
      routes = (
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/account" component={AccountContainer}/>
          <Route exact path="/vocalcommand" component={VocalCommandContainer}/>
          <Route exact path="/speechsynth" component={SpeechSynthContainer}/>
          <Route exact path="/environment" component={EnvironmentContainer}/>
          <Redirect from="/" to="/account"/>
        </Switch>
      );
      battery = (<Battery className="battery" batteryLevel={this.props.batteryLevel}/>);
      navigation = (
        <div className="menu">
          <ul>
            <NavLink to="/account" className="menuLink"><MenuItem className="menuItem" ><img src={account} />Account</MenuItem></NavLink>
            <NavLink to="/vocalcommand" className="menuLink"><MenuItem className="menuItem" ><img src={vocalcommand} />VocalCommand</MenuItem></NavLink>
            <NavLink to="/speechsynth" className="menuLink"><MenuItem className="menuItem" ><img src={speechsynth} />SpeechSynth</MenuItem></NavLink>
            <NavLink to="/environment" className="menuLink"><MenuItem className="menuItem" ><img src={environment} />Environment</MenuItem></NavLink>
          </ul>
        </div>);
    } else {
      routes = (
        <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/subscribe" component={Subscription}/>
          <Route exact path="/account" component={AccountContainer}/>
          <Redirect from="/" to="/home"/>
        </Switch>
      );
      battery = (<Battery className="battery" batteryLevel={this.props.batteryLevel}/>);
      navigation = (
        <div className="menu">
          <ul>
            <NavLink to="/home" className="menuLink"><MenuItem className="menuItem" ><img src={home} />Home</MenuItem></NavLink>
          </ul>
        </div>);
    }

    return (
      <Router>
        <div id="dashboard">
          <MediaQuery minWidth={705}>
            {navigation}
          </MediaQuery>

          <div>
            <div id="header">
              <div id="nameAndBurger" >
                <MediaQuery maxWidth={704}>
                  <BurgerMenu/>
                </MediaQuery>
                <h1>{emojify("OrangeWebApp", {style: {width: "24px", height: "24px"}})}</h1>
                {battery}
              </div>
            </div>
          </div>
          <div id="main_view">
            {
              routes
            }
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={4000}
            draggablePercent={60}
            closeButton={false}
            className="toast-container"
            hideProgressBar={true}
            toastClassName="toast"
          />
        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  name: PropTypes.string,
  notification: PropTypes.object,
  connected: PropTypes.bool,
  batteryLevel: PropTypes.number,
  onConnectionEvent: PropTypes.func,
  readName: PropTypes.func,
  readFirmware: PropTypes.func,
  startErrorNotification: PropTypes.func,
  startWriteNotification: PropTypes.func,
  startBatteryNotification: PropTypes.func,
  startDisconnectNotification: PropTypes.func,
  notifyError: PropTypes.func,
  disconnect: PropTypes.func,
  firmware: PropTypes.string,
};

export default Dashboard;
