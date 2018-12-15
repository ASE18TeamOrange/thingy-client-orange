import React, {Component} from "react";
import DashboardContainer from "./containers/DashboardContainer";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <DashboardContainer />
      </MuiThemeProvider>
    );
  }
}

export default App;
