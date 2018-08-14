import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withStyles, Grid} from 'material-ui';
import {withRouter} from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import Button from "../../components/CustomButtons/Button";
import {setEdit, editPaper, fetchPaper, addPaper, paperLoading} from '../../reducers/paper';
import {bindActionCreators} from "redux";
import FileBase64 from 'react-file-base64';
import {LinearProgress} from "material-ui";
import {TextField, MenuItem, FormControl} from "@material-ui/core";
import ChipInput from 'material-ui-chip-input';
import {Document, Page} from 'react-pdf';

class Edit extends Component {
  state = {
    isSubmitting: false,
    name: '',
    type: '',
    authors: [],
    submittedTo: '',
    pdfBase64: '',
    fileBase64: '',
    pdfPath: '',
    detail: '',
    filePath: '',
    published: '0',
    _id: '',

    numPages: null,
    pageNumber: 1,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.paper.edit.hasOwnProperty('name') && prevState.name !== nextProps.paper.edit.name) {
      return {
        name: nextProps.paper.edit.name,
        type: nextProps.paper.edit.type,
        authors: nextProps.paper.edit.authors,
        submittedTo: nextProps.paper.edit.submittedTo,
        published: nextProps.paper.edit.published,
        detail: nextProps.paper.edit.detail,
        pdfPath: nextProps.paper.edit.pdfPath,
        filePath: nextProps.paper.edit.filePath,
        _id: nextProps.paper._id,
      };
    }
    return null;
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value});
  };
  onSubmit = () => {
    const {name, type, authors, submittedTo, pdfBase64, fileBase64, published, detail} = this.state;
    this.setState({
      isSubmitting: true,
    });
    const paper = {
      id: this.props.paper.edit._id,
      name,
      type,
      authors,
      published,
      detail,
      submittedTo,
      pdfBase64,
      fileBase64,
    };
    this.props.addPaper([]);
    this.props.editPaper(paper).then(res => {
      if (!res.hasOwnProperty('errors')) {
        this.setState({
          isSubmitting: false,
          name: '',
          type: '',
          published: '',
          authors: '',
          submittedTo: '',
          pdfBase64: '',
          detail: '',
          fileBase64: '',
          pdfPath: '',
          filePath: '',
        });
        this.props.fetchPaper();
        this.props.history.push('/paper');
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };

  getFile = (file) => {
    if (file.type.search('pdf') > -1) {
      this.setState({pdfBase64: file.base64});
    }
  };
  getFileZip = (file) => {
    if (file.type.search('zip') > -1) {
      this.setState({fileBase64: file.base64});
    }
  };

  onAdd = (chip) => {
    this.setState({authors: [...this.state.authors, chip]});
  };
  onDelete = (chips, index) => {
    const {authors} = this.state;
    this.setState({authors: [...authors.slice(0, index), ...authors.slice(index + 1)]})
  };

  componentWillUnmount() {
    this.props.setEdit({});
    this.props.fetchPaper();
  }

  render() {
    const {paper, classes} = this.props;
    const {name, type, authors, submittedTo, pdfBase64, pdfPath, pageNumber, numPages, published, detail} = this.state;
    return (
      <div>
        {
          (paper.edit.hasOwnProperty('name')) ? (
            <div>
              <RegularCard
                cardTitle="Edit Paper"
                cardSubtitle="Modify the details"
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
                        <FormControl fullWidth style={{ marginTop: '27px' }}>
                          <TextField
                            select
                            label="Published status"
                            id="published"
                            name="published"
                            value={published}
                            onChange={this.handleChange}
                          >
                            <MenuItem value='0'>
                              Submitted
                            </MenuItem>
                            <MenuItem value='1'>
                              Accepted
                            </MenuItem>
                            <MenuItem value='2'>
                              Published
                            </MenuItem>
                          </TextField>
                        </FormControl>
                      </ItemGrid>
                      <ItemGrid xs={12} sm={12} md>
                        <CustomInput
                          labelText="Detail"
                          id="detail"
                          name="detail"
                          onChange={this.handleChange}
                          inputProps={{
                            value: detail,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md>
                        <FormControl fullWidth>
                          <ChipInput
                            id="authors"
                            name="authors"
                            label="Authors"
                            value={authors}
                            onAdd={(chip) => this.onAdd(chip)}
                            onDelete={(chips, index) => this.onDelete(chips, index)}
                          />
                        </FormControl>
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
                          file={pdfBase64 === '' ? pdfPath : pdfBase64}
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
                footer={<Button color="primary" disabled={this.state.isSubmitting}
                                onClick={this.onSubmit}>Submit</Button>}
              />
            </div>
          ) : <LinearProgress color="secondary" variant="indeterminate"/>
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

const mapStateToProps = ({app, role, paper}) => ({
  app,
  role,
  paper,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEdit,
      editPaper,
      fetchPaper,
      addPaper,
      paperLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Edit)));
