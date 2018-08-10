import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { withStyles } from 'material-ui';
import { withRouter } from 'react-router'
import Grid from '@material-ui/core/Grid';
import RegularCard from "../../components/Cards/RegularCard";
import Table from "../../components/Table/Table";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomButton from '../CustomButtons/Button';
import { bindActionCreators } from "redux";
import Button from '@material-ui/core/Button';
import { Build, Delete, Lock, LockOpen } from "@material-ui/icons";
import appStyle from '../../assets/jss/components/appStyle';
import {
  courseLoading,
  fetchCourse,
  setCurrentPage,
  setEdit,
  addCourse,
  deactiveCourse,
  reactiveCourse,
  deleteCourse
} from '../../reducers/course';

class Course extends Component {
  state = {
    rowsPerPage: 5,
  };
  handleChangePage = (event, page) => {
    console.log('click ' + page);
    this.props.setCurrentPage(page);
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleFirstPageButtonClick = event => {
    this.handleChangePage(event, 0);
  };
  handleBackButtonClick = event => {
    this.handleChangePage(event, this.props.course.currentPage - 1);
  };
  handleNextButtonClick = event => {
    this.handleChangePage(event, this.props.course.currentPage + 1);
  };
  handleLastPageButtonClick = event => {
    this.handleChangePage(
      event,
      Math.max(0, Math.ceil(this.props.course.course.length / this.state.rowsPerPage) - 1),
    );
  };

  onEdit = (key) => {
    this.props.courseLoading();
    this.props.setEdit(this.props.course.course[key + this.state.rowsPerPage * this.props.course.currentPage]);
  };
  onDeactiveCourse = (key) => {
    const course = {
      id: this.props.course.course[key + this.state.rowsPerPage * this.props.course.currentPage]._id,
    };
    this.props.addCourse([]);
    this.props.courseLoading();
    this.props.deactiveCourse(course).then(() => {
      this.props.fetchCourse();
    });
  };
  onReactiveCourse = (key) => {
    const course = {
      id: this.props.course.course[key + this.state.rowsPerPage * this.props.course.currentPage]._id,
    };
    this.props.addCourse([]);
    this.props.courseLoading();
    this.props.reactiveCourse(course).then(() => {
      this.props.fetchCourse();
    });
  };
  onDeleteCourse = (key) => {
    const course = {
      id: this.props.course.course[key + this.state.rowsPerPage * this.props.course.currentPage]._id,
    };
    this.props.addCourse([]);
    this.props.courseLoading();
    this.props.deleteCourse(course).then(() => {
      this.props.fetchCourse();
    });
  };

  render() {
    const { course, classes } = this.props;
    const editButton = props => (
      <Link key="edit" to={`${this.props.location.pathname}/edit`} style={{ textDecoration: 'none' }}>
        <Button key="edit" onClick={() => this.onEdit(props)} variant="fab" mini color="primary" aria-label="edit"
                classes={{ mini: classes.buttonMini }}>
          <Build />
        </Button>
      </Link>
    );
    const deActiveButton = props => (
      <Button key="deActive" variant="fab" mini color="default" aria-label="deactive"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onDeactiveCourse(props)}>
        <Lock />
      </Button>
    );
    const reActiveButton = props => (
      <Button key="reActive" variant="fab" mini color="secondary" aria-label="reactive"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onReactiveCourse(props)}>
        <LockOpen />
      </Button>
    );
    const deleteButton = props => (
      <Button key="delete" variant="fab" mini color="secondary" aria-label="delete"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onDeleteCourse(props)}>
        <Delete />
      </Button>
    );
    const data = course.course.map(c => {
      return [
        c.active ? 'Active' : 'Closed',
        c.code,
        c.name,
        c.time,
        [editButton, c.active ? deActiveButton : reActiveButton, deleteButton]
      ];
    });
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Course"
            cardAction={
              <Link to={`${this.props.location.pathname}/add`} style={{ textDecoration: 'none' }}>
                <CustomButton color="rose">
                  New
                </CustomButton>
              </Link>
            }
            // cardSubtitle="Here is a subtitle for this table"
            content={
              <Table
                tableHeaderColor="primary"
                tableHead={["Active", "Code", "Name", "Time", "Actions"]}
                loading={course.loading}
                tableData={data}
                page={course.currentPage}
                rowsPerPage={this.state.rowsPerPage}
                handleChangePage={this.handleChangePage}
                handleChangeRowsPerPage={this.handleChangeRowsPerPage}
                handleFirstPageButtonClick={this.handleFirstPageButtonClick}
                handleBackButtonClick={this.handleBackButtonClick}
                handleNextButtonClick={this.handleNextButtonClick}
                handleLastPageButtonClick={this.handleLastPageButtonClick}
              />
            }
          />
        </ItemGrid>
      </Grid>
    )
  }
}

Course.propTypes = {
  course: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  addCourse: PropTypes.func.isRequired,
  deactiveCourse: PropTypes.func.isRequired,
  reactiveCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  fetchCourse: PropTypes.func.isRequired,
};

const mapStateToProps = ({ course }) => ({
  course,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPage,
      setEdit,
      deactiveCourse,
      reactiveCourse,
      deleteCourse,
      addCourse,
      fetchCourse,
      courseLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Course)));
