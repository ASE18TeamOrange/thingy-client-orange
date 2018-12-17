import React from "react";
import PropTypes from "prop-types";
import {Route, NavLink, Switch, Redirect} from "react-router-dom";
import {BrowserRouter as Router} from "react-router-dom";
import MediaQuery from "react-responsive";
import MenuItem from "material-ui/MenuItem";
import Login from "../Account/Login";
import Subscription from "../Account/Subscription";
import Home from "../Account/Home";
import AccountContainer from "../../containers/AccountContainer";
import account from "../../assets/environment.png";
import home from "../../assets/environment.png";
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
  }

  componentWillReceiveProps(np) {
    if (np.notification !== this.state.notification) {
      this.setState({
        notification: np.notification,
      });
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
          <Route exact path="/environment" component={EnvironmentContainer}/>
          <Redirect from="/" to="/account"/>
        </Switch>
      );
      battery = (<Battery className="battery" batteryLevel={this.props.batteryLevel}/>);
      navigation = (
        <div className="menu">
          <ul>
            <NavLink to="/account" className="menuLink"><MenuItem className="menuItem" ><img src={account} />Account</MenuItem></NavLink>
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

        </div>
      </Router>
    );
  }
}

Dashboard.propTypes = {
  notification: PropTypes.object,
};

export default Dashboard;
