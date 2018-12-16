import {connect} from "react-redux";
import {changeCardTab, toggleEnvironment} from "../actions/misc";
import Environment from "../components/Environment/Environment";

const mapStateToProps = ({misc}) => {
  return ({
    temperature: misc.temperature,
    pressure: misc.pressure,
    humidity: misc.humidity,
    co2: misc.co2,
    color: misc.color,
  });
};

const mapDispatchToProps = (dispatch) => ({
  changeTab: (feature, tab) => {
    dispatch(changeCardTab(feature, tab));
  },
  toggleAll: (toggle) => {
    dispatch(toggleEnvironment(toggle));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Environment);
