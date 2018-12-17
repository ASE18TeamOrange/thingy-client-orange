import React from "react";
import {registerLanguage} from "react-syntax-highlighter/prism-light";
import js from "react-syntax-highlighter/languages/prism/javascript";
import "./styles.css";

registerLanguage("javascript", js);

export class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: props.tab !== undefined ? props.tab : "feature",
    };
  }

  componentWillReceiveProps(np) {
    if (np.tab !== this.state.activeTab && np.tab !== undefined) {
      this.setState((ps) => ({
        ...ps,
        activeTab: np.tab,
      }));
    }
  }

  displayTab(tab) {
    this.props.changeTab(this.props.interactionName ? this.props.interactionName : this.props.name, tab);
  }

  render() {
    return (
      <div className="card">
        <ul>
          <li onClick={() => this.displayTab("feature")} className={this.state.activeTab === "feature" ? `active ${this.state.activeTab}` : `${this.state.activeTab}`}><span>{this.props.interactionName ? this.props.name : this.props.name.substr(0, 1).toUpperCase() + this.props.name.substring(1).toLowerCase()}</span></li>
        </ul>
        <div className="card_content_container">
          {
            this.props.children
          }
        </div>
      </div>
    );
  }
}

export const LoadingIcon = () => (
  <div className="lds-css ng-scope loading_icon_outer">
    <div className="loading_icon">
      <div></div>
    </div>
  </div>
);
