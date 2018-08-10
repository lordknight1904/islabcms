import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import { createPaper, fetchPaper } from '../../reducers/paper';
import { bindActionCreators } from "redux";
import ChipInput from 'material-ui-chip-input';
import { Document, Page } from 'react-pdf';
import FileBase64 from 'react-file-base64';

class Form extends Component {
  state = {
    isSubmitting: false,
    name: '',
    type: '',
    authors: [],
    submittedTo: '',
    pdfBase64: '',
    fileBase64: '',
    pdfPath: '',
    filePath: '',
    _id: '',

    numPages: null,
    pageNumber: 1,
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  getFile = (file) => {
    if (file.type.search('pdf') > -1) {
      this.setState({ pdfBase64: file.base64 });
    }
  };
  getFileZip = (file) => {
    if (file.type.search('zip') > -1) {
      this.setState({ fileBase64: file.base64 });
    }
  };
  onSubmit = () => {
    const { name, type, authors, submittedTo, pdfBase64, fileBase64 } = this.state;
    this.setState({ isSubmitting: true });
    const paper = {
      name,
      type,
      authors,
      submittedTo,
      pdfBase64,
      fileBase64,
    };
    this.props.createPaper(paper).then(res => {
      this.props.fetchPaper();
      if (!res.hasOwnProperty('error')) {
        this.setState({
          isSubmitting: false,
          name: '',
          type: '',
          authors: '',
          submittedTo: '',
          pdfBase64: '',
          fileBase64: '',
          pdfPath: '',
          filePath: '',
        });
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };
  onAdd = (chip) => {
    this.setState({ authors: [...this.state.authors, chip] });
  };
  onDelete = (chips, index) => {
    const { authors } = this.state;
    this.setState({ authors: [...authors.slice(0, index), ...authors.slice(index + 1)]})
  };
  render() {
    const { classes } = this.props;
    const { name, type, authors, submittedTo, pdfBase64, pageNumber, numPages } = this.state;
    return (
      <div>
        <RegularCard
          cardTitle="Create New Paper"
          cardSubtitle="Fill in the details"
          content={
            <div>
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
                    labelText="Type"
                    id="type"
                    name="type"
                    onChange={this.handleChange}
                    inputProps={{
                      value: type,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md>
                  <ChipInput
                    id="authors"
                    name="authors"
                    label="Authors"
                    value={authors}
                    onAdd={(chip) => this.onAdd(chip)}
                    onDelete={(chips, index) => this.onDelete(chips, index)}
                  />
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md>
                  <CustomInput
                    labelText="Submitted to"
                    id="submittedTo"
                    name="submittedTo"
                    onChange={this.handleChange}
                    inputProps={{
                      value: submittedTo,
                    }}
                    formControlProps={{
                      fullWidth: true,
                    }}
                  />
                </ItemGrid>
              </Grid>
              <Grid container>
                <ItemGrid xs={12} sm={12} md>
                  <Document
                    file={pdfBase64}
                    onLoadSuccess={this.onDocumentLoad}
                  >
                    <Page
                      className={classes.pdfWidth}
                      pageNumber={pageNumber}
                    />
                  </Document>
                  <p>Page {pageNumber} of {numPages}</p>
                </ItemGrid>
                <ItemGrid xs={12} sm={12} md>
                  <FileBase64
                    multiple={false}
                    onDone={this.getFile}
                  />
                  <FileBase64
                    multiple={false}
                    onDone={this.getFileZip}
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
      fetchPaper,
      createPaper
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Form)));
