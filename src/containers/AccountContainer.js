import {connect} from "react-redux";
import {toggleFeature} from "../actions/misc";
import Account from "../components/Account/Account";

const mapStateToProps = ({misc}) => {
    return ({
        temperature: misc.temperature
    });
};

const mapDispatchToProps = (dispatch) => ({
    toggleTemperature: () => {
        dispatch(toggleFeature("temperature"));
    }
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Account);
