import React from "react";
import Drawer from "material-ui/Drawer";
import IconButton from "material-ui/IconButton";
import MenuItem from "material-ui/MenuItem";
import MenuIcon from "material-ui/svg-icons/navigation/menu.js";
import {NavLink} from "react-router-dom";
import environment from "../../assets/environment.png";

class BurgerMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.toggleMenu = this.toggleMenu.bind(this);
    this.onRequestChange = this.onRequestChange.bind(this);
  }

  toggleMenu(open) {
    this.setState({open: open});
  }

  onRequestChange(open, reason) {
    // For handling clicking the menu away, pressing escape or swiping
    if (!open) {
      this.setState({open: open});
    }
  }


  render() {
    return (
      <div>
        <IconButton className={"burgerIcon"} onClick={() => this.toggleMenu(true)} color="inherit" aria-label="Menu">
        hey
          <MenuIcon />
        </IconButton>
        <Drawer
          disableSwipeToOpen={true}
          docked={false}
          variant="temporary"
          containerClassName="menu"
          overlayClassName="overlay"
          open={this.state.open}
          /* onClose={() => this.toggleMenu(false)}
          onOpen={() => this.toggleMenu(true)} */
          onRequestChange={(open, reason) => this.onRequestChange(open, reason)}
        >
          <ul>
            <NavLink to="/environment" className="menuLink"><MenuItem className="menuItem" onClick={() => this.toggleMenu(false)}><img src={environment} />Environment</MenuItem></NavLink>
          </ul>
        </Drawer>
      </div>
    );
  }
}

export default BurgerMenu;
