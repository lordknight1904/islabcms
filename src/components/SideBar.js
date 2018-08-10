import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import cx from "classnames";
import { withRouter } from 'react-router'
import {
  withStyles,
  Drawer,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "material-ui";


import sidebarStyle from "../assets/jss/components/sidebarStyle";

const Sidebar = ({ ...props }) => {
  function activeRoute(routeName) {
    return props.location.pathname.indexOf(routeName) > -1;
  }

  const { classes, color, logo, image, logoText, paths } = props;
  const links = (
    <List className={classes.list}>
      {paths.map((prop, key) => {
        if (prop.redirect || !prop.onSide) return null;
        const listItemClasses = cx({
          [" " + classes[color]]: activeRoute(prop.path)
        });
        const whiteFontClasses = cx({
          [" " + classes.whiteFont]: activeRoute(prop.path)
        });
        return (
          <NavLink
            to={prop.path}
            className={classes.item}
            activeClassName="active"
            key={key}
          >
            <ListItem button className={classes.itemLink + listItemClasses}>
              <ListItemIcon className={classes.itemIcon + whiteFontClasses}>
                <prop.icon />
              </ListItemIcon>
              <ListItemText
                primary={prop.sidebarName}
                className={classes.itemText + whiteFontClasses}
                disableTypography={true}
              />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );
  const brand = (
    <div className={classes.logo}>
      <a href="https://www.creative-tim.com" className={classes.logoLink}>
        <div className={classes.logoImage}>
          <img src={logo} alt="logo" className={classes.img} />
        </div>
        {logoText}
      </a>
    </div>
  );
  return [
    <Hidden mdUp key="hiddenMDUP">
      <Drawer
        variant="temporary"
        anchor="right"
        open={props.open}
        classes={{
          paper: classes.drawerPaper
        }}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true // Better open performance on mobile.
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>
          {links}
        </div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>,
    <Hidden smDown key="hiddenSMDown">
      <Drawer
        anchor="left"
        variant="permanent"
        open
        classes={{
          paper: classes.drawerPaper
        }}
      >
        {brand}
        <div className={classes.sidebarWrapper}>{links}</div>
        {image !== undefined ? (
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + image + ")" }}
          />
        ) : null}
      </Drawer>
    </Hidden>
  ];
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withStyles(sidebarStyle)(withRouter(Sidebar));
