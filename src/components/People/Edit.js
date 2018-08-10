import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
// import CustomSelect from "../../components/CustomSelect/CustomSelect";
import Button from "../../components/CustomButtons/Button";
import { setEdit, editPerson, fetchPerson, addPerson, personLoading } from '../../reducers/person';
import { bindActionCreators } from "redux";
import FileBase64 from 'react-file-base64';
import { LinearProgress } from "material-ui";

class Edit extends Component {
  state = {
    isSubmitting: false,
    name: '',
    graduated: false,
    field: '',
    email: '',
    title: '',
    occupation: '',
    profilePage: '',
    imagePath: '',
    _id: '',
    file: '',
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.person.edit.hasOwnProperty('name') && prevState.name !== nextProps.person.edit.name) {
      return {
        name: nextProps.person.edit.name,
        graduated: nextProps.person.edit.graduated,
        field: nextProps.person.edit.field,
        email: nextProps.person.edit.email,
        title: nextProps.person.edit.title,
        occupation: nextProps.person.edit.occupation,
        profilePage: nextProps.person.edit.profilePage,
        imagePath: nextProps.person.edit.imagePath,
        _id: nextProps.person._id,
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  onSubmit = () => {
    const { name, graduated, field, email, title, occupation, profilePage, file } = this.state;
    this.setState({
      isSubmitting: true,
    });
    const person = {
      id: this.props.person.edit._id,
      name,
      graduated,
      field,
      email,
      title,
      occupation,
      profilePage,
      file,
    };
    this.props.addPerson([]);
    this.props.editPerson(person).then(res => {
      if (!res.hasOwnProperty('errors')) {
        this.setState({
          isSubmitting: false,
          name: '',
          graduated: '',
          field: '',
          email: '',
          title: '',
          occupation: '',
          profilePage: '',
          file: '',
        });
        this.props.fetchPerson();
        this.props.history.push('/person');
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };

  getFile = (file) => {
    if (file.type.search('image') > -1) {
      this.setState({ file: file.base64 });
    }
  };
  componentWillUnmount() {
    this.props.setEdit({});
    this.props.fetchPerson();
  }
  render() {
    const { person } = this.props;
    const { field, graduated, name, title, occupation, email, profilePage, imagePath, file } = this.state;
    return (
      <div>
        {
          (person.edit.hasOwnProperty('name')) ? (
            <div>
              <RegularCard
                cardTitle="Edit Person"
                cardSubtitle="Modify the details"
                content={
                  <div>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={graduated}
                              id="graduated"
                              name="graduated"
                              onChange={this.handleChangeCheck}
                            />
                          }
                          label="Graduated"
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Name"
                          id="name"
                          name="name"
                          onChange={this.handleChange}
                          inputProps={{
                            value: name,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="email"
                          id="email"
                          name="email"
                          onChange={this.handleChange}
                          inputProps={{
                            value: email,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Field"
                          id="field"
                          name="field"
                          onChange={this.handleChange}
                          inputProps={{
                            value: field,
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          // error={passwordError.length > 0}
                          // helperText={passwordError}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Profile Page"
                          id="profilePage"
                          name="profilePage"
                          onChange={this.handleChange}
                          inputProps={{
                            value: profilePage,
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          // error={newPasswordError.length > 0}
                          // helperText={newPasswordError}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Title"
                          id="title"
                          name="title"
                          onChange={this.handleChange}
                          inputProps={{
                            value: title,
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          // error={passwordError.length > 0}
                          // helperText={passwordError}
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Occupation"
                          id="occupation"
                          name="occupation"
                          onChange={this.handleChange}
                          inputProps={{
                            value: occupation,
                          }}
                          formControlProps={{
                            fullWidth: true
                          }}
                          // error={newPasswordError.length > 0}
                          // helperText={newPasswordError}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <img
                          src={file === '' ? `http://localhost:4000/${imagePath}` : file}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            width: 'auto',
                            height: 'auto',
                          }}
                          alt="person"
                        />
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <FileBase64
                          multiple={false}
                          onDone={this.getFile}
                        />
                      </ItemGrid>
                    </Grid>
                  </div>
                }
                footer={<Button color="primary" disabled={this.state.isSubmitting}
                                onClick={this.onSubmit}>Submit</Button>}
              />
            </div>
          ) : <LinearProgress color="secondary" variant="indeterminate" />
        }
      </div>
    )
  }
}

Edit.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  role: PropTypes.object.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};

const mapStateToProps = ({ app, role, person }) => ({
  app,
  role,
  person,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEdit,
      editPerson,
      fetchPerson,
      addPerson,
      personLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Edit)));
