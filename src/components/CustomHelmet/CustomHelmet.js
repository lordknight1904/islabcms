import React  from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

const CustomHelmet = props => (
  <Helmet
    key="helmet"
    title={props.app.title}
    titleTemplate=""
    meta={[
      { charset: 'utf-8' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        name: 'description',
        content: props.app.description,
      },
    ]}
  />
);
CustomHelmet.propTypes = {
  app: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
export default connect(mapStateToProps)(CustomHelmet);
