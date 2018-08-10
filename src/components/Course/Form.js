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
import { createCourse, fetchCourse } from '../../reducers/course';
import { bindActionCreators } from "redux";
import FileBase64 from 'react-file-base64';
import { Document, Page } from 'react-pdf';

class Form extends Component {
  state = {
    isSubmitting: false,
    active: false,
    code: '',
    name: '',
    time: '',
    file: '',
    pdfBase64: '',

    numPages: null,
    pageNumber: 1,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  getFile = (file) => {
    if (file.type.search('pdf') > -1) {
      this.setState({ file: file.base64 });
    }
  };
  onSubmit = () => {
    const { name, active, code, time, file } = this.state;
    this.setState({ isSubmitting: true });
    const course = {
      name,
      active,
      code,
      time,
      pdfBase64: file,
    };
    this.props.createCourse(course).then(res => {
      this.props.fetchCourse();
      if (!res.hasOwnProperty('error')) {
        this.setState({
          isSubmitting: false,
          name: '',
          active: '',
          code: '',
          time: '',
          file: '',
        });
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };
  render() {
    const { classes } = this.props;
    const { active, name, code, time, file, pageNumber, numPages } = this.state;
    return (
      <div>
        <RegularCard
          cardTitle="Create New Course"
          cardSubtitle="Fill in the details"
          content={
            <div>
              <Grid container>
                <ItemGrid xs={12} sm={12} md>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={active}
                        id="active"
                        name="active"
                        onChange={this.handleChangeCheck}
                      />
                    }
                    style={{
                      marginTop: '35px',
                    }}
                    label="Active"
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md>
                  <CustomInput
                    labelText="Time"
                    id="time"
                    name="time"
                    onChange={this.handleChange}
                    inputProps={{
                      value: time,
                    }}
                    formControlProps={{
                      fullWidth: true
                    }}
                    // error={passwordError.length > 0}
                    // helperText={passwordError}
                  />
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md>
                  <CustomInput
                    labelText="Code"
                    id="code"
                    name="code"
                    onChange={this.handleChange}
                    inputProps={{
                      value: code,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </ItemGrid>
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
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md={6}>
                  <Document
                    file={file}
                    onLoadSuccess={this.onDocumentLoad}
                  >
                    <Page
                      className={classes.pdfWidth}
                      pageNumber={pageNumber}
                    />
                  </Document>
                  <p>Page {pageNumber} of {numPages}</p>
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md={6}>
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
      fetchCourse,
      createCourse
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Form)));
