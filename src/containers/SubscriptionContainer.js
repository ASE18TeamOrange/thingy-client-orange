import {connect} from "react-redux";
import Subscription from "../components/Subscription/Subscription";

const mapStateToProps = ({misc}) => {
  return ({
    someprop: misc.prop,
  });
};

const mapDispatchToProps = (dispatch) => ({
  someoperation: () => {
    console.log("do something");
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Subscription);
