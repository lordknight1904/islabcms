import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import { FormControlLabel, Checkbox } from '@material-ui/core';
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import { createPerson, fetchPerson } from '../../reducers/person';
import { bindActionCreators } from "redux";
import FileBase64 from 'react-file-base64';

class Form extends Component {
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
    file: '',
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  getFile = (file) => {
    if (file.type.search('image') > -1) {
      this.setState({ file: file.base64 });
    }
  };
  onSubmit = () => {
    const { name, graduated, field, email, title, occupation, profilePage, file } = this.state;
    this.setState({ isSubmitting: true });
    const person = {
      name,
      graduated,
      field,
      email,
      title,
      occupation,
      profilePage,
      imageBase64: file,
    };
    this.props.createPerson(person).then(res => {
      this.props.fetchPerson();
      if (!res.hasOwnProperty('error')) {
        this.setState({
          isSubmitting: false,
          name: '',
          graduated: '',
          field: '',
          email: '',
          title: '',
          occupation: '',
          profilePage: '',
          file: ''
        });
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };
  render() {
    const { name, graduated, field, email, title, occupation, profilePage, file } = this.state;
    return (
      <div>
        <RegularCard
          cardTitle="Create New Person"
          cardSubtitle="Fill in the details"
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
                    labelText="name"
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
                  {
                    file !== '' ? (
                      <img
                        src={file}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '100%',
                          width: 'auto',
                          height: 'auto',
                        }}
                        alt="person"
                      />
                    ) : null
                  }
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
          footer={<Button color="primary" disabled={this.state.isSubmitting} onClick={this.onSubmit}>Submit</Button>}
        />
      </div>
    )
  }
}

Form.propTypes = {
  classes: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchPerson,
      createPerson
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Form)));
