import React from "react";
import PropTypes from "prop-types";
import { withRouter } from 'react-router';
import {
  withStyles,
  AppBar,
  Toolbar,
  Button
} from "material-ui";
import { KeyboardArrowLeft } from "@material-ui/icons";
import cx from "classnames";

import headerStyle from "../../assets/jss/components/headerStyle.js";

function Header({ ...props }) {
  function makeBrand() {
    let name = '~~~';
    props.paths.map((prop, key) => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
      }
      return name;
    });
    return name;
  }
  const { classes, color, goBack } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <Button className={classes.noMinWidth} onClick={goBack}>
            <KeyboardArrowLeft />
          </Button>
          <Button className={classes.title}>
            {makeBrand()}
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  goBack: PropTypes.func,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default withRouter(withStyles(headerStyle)(Header));
