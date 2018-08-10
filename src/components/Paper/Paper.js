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
import { Build, Delete } from "@material-ui/icons";
import appStyle from '../../assets/jss/components/appStyle';
import {
  paperLoading,
  fetchPaper,
  setCurrentPage,
  setEdit,
  addPaper,
  deactivePaper,
  reactivePaper,
  deletePaper
} from '../../reducers/paper';

class Paper extends Component {
  state = {
    rowsPerPage: 5,
  };
  handleChangePage = (event, page) => {
    this.props.setCurrentPage(page);
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  handleFirstPageButtonClick = event => {
    this.handleChangePage(event, 0);
  };
  handleBackButtonClick = event => {
    this.handleChangePage(event, this.props.page - 1);
  };
  handleNextButtonClick = event => {
    this.handleChangePage(event, this.props.page + 1);
  };
  handleLastPageButtonClick = event => {
    this.handleChangePage(
      event,
      Math.max(0, Math.ceil(this.props.paper.paper.length / this.state.rowsPerPage) - 1),
    );
  };

  onEdit = (key) => {
    this.props.paperLoading();
    this.props.setEdit(this.props.paper.paper[key + this.state.rowsPerPage * this.props.paper.currentPage]);
  };
  onDeactivePaper = (key) => {
    const paper = {
      id: this.props.paper.paper[key + this.state.rowsPerPage * this.props.paper.currentPage]._id,
    };
    this.props.addPaper([]);
    this.props.paperLoading();
    this.props.deactivePaper(paper).then(() => {
      this.props.fetchPaper();
    });
  };
  onReactivePaper = (key) => {
    const paper = {
      id: this.props.paper.paper[key + this.state.rowsPerPage * this.props.paper.currentPage]._id,
    };
    this.props.addPaper([]);
    this.props.paperLoading();
    this.props.reactivePaper(paper).then(() => {
      this.props.fetchPaper();
    });
  };
  onDeletePaper = (key) => {
    const paper = {
      id: this.props.paper.paper[key + this.state.rowsPerPage * this.props.paper.currentPage]._id,
    };
    this.props.addPaper([]);
    this.props.paperLoading();
    this.props.deletePaper(paper).then(() => {
      this.props.fetchPaper();
    });
  };

  render() {
    const { classes, paper } = this.props;
    const editButton = props => (
      <Link key="edit" to={`${this.props.location.pathname}/edit`} style={{ textDecoration: 'none' }}>
        <Button key="edit" onClick={() => this.onEdit(props)} variant="fab" mini color="primary" aria-label="edit"
                classes={{ mini: classes.buttonMini }}>
          <Build />
        </Button>
      </Link>
    );
    const deleteButton = props => (
      <Button key="delete" variant="fab" mini color="secondary" aria-label="delete"
              classes={{ mini: classes.buttonMini }} onClick={() => this.onDeletePaper(props)}>
        <Delete />
      </Button>
    );
    const data = paper.paper.map(pr => {
      return [
        pr.type,
        pr.name,
        pr.authors.slice(0, -1).join(', ') + ' and ' + pr.authors.slice(-1),
        pr.submittedTo,
        [editButton, deleteButton]
      ];
    });
    return (
      <Grid container>
        <ItemGrid xs={12} sm={12} md={12}>
          <RegularCard
            cardTitle="Paper"
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
                tableHead={["Type", "Name", "Authors", "Submitted to", "Actions"]}
                loading={paper.loading}
                tableData={data}
                page={paper.currentPage}
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

Paper.propTypes = {
  classes: PropTypes.object.isRequired,
  paper: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  addPaper: PropTypes.func.isRequired,
  deactivePaper: PropTypes.func.isRequired,
  reactivePaper: PropTypes.func.isRequired,
  deletePaper: PropTypes.func.isRequired,
  fetchPaper: PropTypes.func.isRequired,
};

const mapStateToProps = ({ paper }) => ({
  paper,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentPage,
      setEdit,
      deactivePaper,
      reactivePaper,
      deletePaper,
      addPaper,
      fetchPaper,
      paperLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Paper)));
