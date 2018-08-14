import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";
import {withStyles} from 'material-ui';
import {withRouter} from 'react-router'
import Grid from '@material-ui/core/Grid';
import RegularCard from "../../components/Cards/RegularCard";
import Table from "../../components/Table/Table";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomButton from '../CustomButtons/Button';
import {bindActionCreators} from "redux";
import Button from '@material-ui/core/Button';
import {Build, Delete} from "@material-ui/icons";
import appStyle from '../../assets/jss/components/appStyle';
import {
  personLoading,
  fetchPerson,
  setCurrentPage,
  setEdit,
  addPerson,
  deactivePerson,
  reactivePerson,
  deletePerson
} from '../../reducers/person';

class People extends Component {
  state = {
    rowsPerPage: 5,
  };
  handleChangePage = (event, page) => {
    this.props.setCurrentPage(page);
  };
  handleChangeRowsPerPage = event => {
    this.setState({rowsPerPage: event.target.value});
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
        Math.max(0, Math.ceil(this.props.person.person.length / this.state.rowsPerPage) - 1),
    );
  };

  onEdit = (key) => {
    this.props.personLoading();
    this.props.setEdit(this.props.person.person[key + this.state.rowsPerPage * this.props.person.currentPage]);
  };
  onDeactivePerson = (key) => {
    const person = {
      id: this.props.person.person[key + this.state.rowsPerPage * this.props.person.currentPage]._id,
    };
    this.props.addPerson([]);
    this.props.personLoading();
    this.props.deactivePerson(person).then(() => {
      this.props.fetchPerson();
    });
  };
  onReactivePerson = (key) => {
    const person = {
      id: this.props.person.person[key + this.state.rowsPerPage * this.props.person.currentPage]._id,
    };
    this.props.addPerson([]);
    this.props.personLoading();
    this.props.reactivePerson(person).then(() => {
      this.props.fetchPerson();
    });
  };
  onDeletePerson = (key) => {
    const person = {
      id: this.props.person.person[key + this.state.rowsPerPage * this.props.person.currentPage]._id,
    };
    this.props.addPerson([]);
    this.props.personLoading();
    this.props.deletePerson(person).then(() => {
      this.props.fetchPerson();
    });
  };

  render() {
    const {classes, person} = this.props;
    const editButton = props => (
        <Link key="edit" to={`${this.props.location.pathname}/edit`} style={{textDecoration: 'none'}}>
          <Button key="edit" onClick={() => this.onEdit(props)} variant="fab" mini color="primary" aria-label="edit"
                  classes={{mini: classes.buttonMini}}>
            <Build/>
          </Button>
        </Link>
    );
    const deleteButton = props => (
        <Button key="delete" variant="fab" mini color="secondary" aria-label="delete"
                classes={{mini: classes.buttonMini}} onClick={() => this.onDeletePerson(props)}>
          <Delete/>
        </Button>
    );
    const data = person.person.map(pr => {
      return [
        pr.graduated ? 'Graduated' : '-',
        pr.name,
        [editButton, deleteButton]
      ];
    });
    return (
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <RegularCard
                cardTitle="Person"
                cardAction={
                  <Link to={`${this.props.location.pathname}/add`} style={{textDecoration: 'none'}}>
                    <CustomButton color="rose">
                      New
                    </CustomButton>
                  </Link>
                }
                // cardSubtitle="Here is a subtitle for this table"
                content={
                  <Table
                      tableHeaderColor="primary"
                      tableHead={["Graduated", "Name", "Actions"]}
                      loading={person.loading}
                      tableData={data}
                      page={person.currentPage}
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

People.propTypes = {
  classes: PropTypes.object.isRequired,
  person: PropTypes.object.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired,
  addPerson: PropTypes.func.isRequired,
  deactivePerson: PropTypes.func.isRequired,
  reactivePerson: PropTypes.func.isRequired,
  deletePerson: PropTypes.func.isRequired,
  fetchPerson: PropTypes.func.isRequired,
};

const mapStateToProps = ({person}) => ({
  person,
});
const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
          setCurrentPage,
          setEdit,
          deactivePerson,
          reactivePerson,
          deletePerson,
          addPerson,
          fetchPerson,
          personLoading,
        },
        dispatch,
    );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(People)));
