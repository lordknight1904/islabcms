import React, { Component } from 'react';
import { connect } from 'react-redux';
import CustomHelmet from './CustomHelmet/CustomHelmet';
import Container from './Container';
import PropTypes from 'prop-types';
import { fetchPerson } from '../reducers/person';
import { fetchCourse } from '../reducers/course';
import { fetchPaper } from '../reducers/paper';
import { bindActionCreators } from 'redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // this.props.fetchRole();
    this.props.fetchPerson();
    this.props.fetchPaper();
    this.props.fetchCourse();
  }

  render() {
    return [
      <CustomHelmet key='helmet' />,
      <Container key='container' />
    ];
  }
}

App.propTypes = {
  fetchPerson: PropTypes.func.isRequired,
  fetchPaper: PropTypes.func.isRequired,
  fetchCourse: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPerson,
      fetchCourse,
      fetchPaper,
    },
    dispatch,
  );
export default connect(mapStateToProps, mapDispatchToProps)(App);
