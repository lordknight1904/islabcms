import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import PropTypes from 'prop-types';
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./Login/Login";
import SideBar from "./SideBar";
import Header from "../components/Header/Header";
import paths from './paths';
import { withStyles } from 'material-ui';
import appStyle from "../assets/jss/components/appStyle";
import image from "../assets/images/sidebar-2.jpg";
import logo from "../assets/images/reactlogo.png";

class Container extends React.Component {
  state = {
    mobileOpen: false,
  };
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  render() {
    const { classes, app, history } = this.props;
    return (
      this.props.app.admin.token === '' ? (
        <div className={classes.wrapper}>
          <SideBar
            paths={paths}
            logoText={app.appName}
            logo={logo}
            image={image}
            handleDrawerToggle={this.handleDrawerToggle}
            open={this.state.mobileOpen}
            color="blue"
          />
          <div className={classes.mainPanel}>
            <Header
              paths={paths}
              handleDrawerToggle={this.handleDrawerToggle}
              goBack={history.goBack}
            />
            <div className={classes.content}>
              <div className={classes.container}>
                <Switch key="switch">
                  {paths.map((prop, key) => {
                    if (prop.redirect)
                      return <Redirect from={prop.path} to={prop.to} key={key} />;
                    return <Route path={prop.path} exact={prop.exact} component={prop.component} key={key} />;
                  })}
                </Switch>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ height: '100vh' }}>
          <Login />
        </div>
      )
    )
  }
}

Container.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
export default withRouter(connect(mapStateToProps)(withStyles(appStyle)(Container)));
