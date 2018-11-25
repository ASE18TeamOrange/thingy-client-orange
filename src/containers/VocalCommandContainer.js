import {connect} from "react-redux";
import VocalCommand from "../components/VocalCommand/VocalCommand";

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
)(VocalCommand);
