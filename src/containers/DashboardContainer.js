import {connect} from "react-redux";
import {disconnect} from "../actions/misc";
import Dashboard from "../components/Dashboard/Dashboard";

const mapStateToProps = ({misc}) => {
  return ({
    name: misc.name.reading.name,
    notification: misc.notification,
    batteryLevel: misc.battery.reading.status,
  });
};

const mapDispatchToProps = (dispatch) => ({
  disconnect: () => {
    dispatch(disconnect());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Dashboard);
