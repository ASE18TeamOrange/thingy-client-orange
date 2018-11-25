import {connect} from "react-redux";
import Account from "../components/Account/Account";

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
)(Account);
