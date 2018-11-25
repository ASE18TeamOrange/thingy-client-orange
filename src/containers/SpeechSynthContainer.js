import {connect} from "react-redux";
import SpeechSynth from "../components/SpeechSynth/SpeechSynth";

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
)(SpeechSynth);
