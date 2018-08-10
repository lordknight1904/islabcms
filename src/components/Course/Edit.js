import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles, Grid } from 'material-ui';
import {
  FormControlLabel,
  Checkbox,
  Table,
  TableCell,
  TableRow,
  TableBody,
  Typography,
} from '@material-ui/core';
import { withRouter } from 'react-router'
import appStyle from '../../assets/jss/components/appStyle';
import RegularCard from "../../components/Cards/RegularCard";
import ItemGrid from "../../components/Grid/ItemGrid";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomButton from "../../components/CustomButtons/Button";
import Button from '@material-ui/core/Button';
import { setEdit, editCourse, fetchCourse, addCourse, courseLoading } from '../../reducers/course';
import { bindActionCreators } from "redux";
import FileBase64 from 'react-file-base64';
import { LinearProgress } from "material-ui";
import { Delete, Add } from "@material-ui/icons";

class Edit extends Component {
  state = {
    isSubmitting: false,
    active: false,
    code: '',
    alias: '',
    name: '',
    time: '',
    pdfPath: '',
    file: '',
    materialTemp: '',
    textbookTemp: '',
    textbook: [],
    preferenceTemp: '',
    preference: [],
    materials: [],
    _id: '',

    numPages: null,
    pageNumber: 1,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.course.edit.hasOwnProperty('name') && prevState.name !== nextProps.course.edit.name) {
      return {
        active: nextProps.course.edit.active,
        code: nextProps.course.edit.code,
        name: nextProps.course.edit.name,
        alias: nextProps.course.edit.alias,
        time: nextProps.course.edit.time,
        textbook: nextProps.course.edit.textbook,
        preference: nextProps.course.edit.preference,
        materials: nextProps.course.edit.materials,
        pdfPath: nextProps.course.edit.pdfPath,
        _id: nextProps.course._id,
      };
    }
    return null;
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleChangeCheck = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  onSubmit = () => {
    const { name, active, code, time, file } = this.state;
    this.setState({
      isSubmitting: true,
    });
    const course = {
      id: this.props.course.edit._id,
      name,
      active,
      code,
      time,
      file,
    };
    this.props.addCourse([]);
    this.props.editCourse(course).then(res => {
      if (!res.hasOwnProperty('errors')) {
        this.setState({
          isSubmitting: false,
          name: '',
          active: '',
          code: '',
          time: '',
          file: '',
        });
        this.props.fetchCourse();
        this.props.history.push('/course');
      } else {
        this.setState({
          isSubmitting: false,
        });
      }
    });
  };

  getFile = (file) => {
    if (file.type.search('pdf') > -1) {
      this.setState({ file: file.base64 });
    }
  };
  onKeyDown = (event) => {
    if (event.key === 'Enter' && this.state[event.target.name] !== '') {
      event.preventDefault();
      this.setState({
        [event.target.name]: '',
        [event.target.name.slice(0, -4)]: [...this.state[event.target.name.slice(0, -4)], event.target.value],
      });
    }
  };
  onKeyDownMaterial = (event, index) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      let materials = this.state.materials;
      materials[index]['name'] = event.target.value;
      this.setState({
        materialTemp: '',
        materials,
      });
    }
  };
  onDeleteCourse = (name, index) => {
    this.setState({
      [name]: [...this.state[name].slice(0, index), ...this.state[name].slice(index + 1)]
    })
  };
  addMaterial = () => {
    this.setState({
      materials: [{ name: '', filePath: '', solutionPath: '' }, ...this.state.materials],
    });
  };
  onDeleteMaterial = (index) => {
    this.setState({
      materials: [...this.state.materials.slice(0, index), ...this.state.materials.slice(index + 1)],
    });
  };
  componentWillUnmount() {
    this.props.setEdit({});
    this.props.fetchCourse();
  }

  render() {
    const { course, classes } = this.props;
    const {
      active,
      name,
      code,
      time,
      materialTemp,
      materials,
      alias,
      textbook,
      textbookTemp,
      preference,
      preferenceTemp,
    } = this.state;
    return (
      <div>
        {
          (course.edit.hasOwnProperty('name')) ? (
            <div>
              <RegularCard
                cardTitle="Edit Course"
                cardSubtitle="Modify the details"
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
                        <CustomInput
                          labelText="Alias"
                          id="alias"
                          name="alias"
                          onChange={this.handleChange}
                          inputProps={{
                            value: alias,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Text Book"
                          id="textbookTemp"
                          name="textbookTemp"
                          onChange={this.handleChange}
                          onKeyDown={this.onKeyDown}
                          inputProps={{
                            value: textbookTemp,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                      <Table className={classes.table} style={{ marginBottom: '20px' }}>
                        <TableBody>
                          {
                            textbook.map((tb, index) => (
                              <TableRow key={index}>
                                <TableCell style={{ width: '85%' }}>
                                  {tb}
                                </TableCell>
                                <TableCell style={{ width: '15%' }}>
                                  <Button
                                    key="delete" variant="fab" mini color="secondary" aria-label="delete"
                                    classes={{ mini: classes.buttonMini }}
                                    onClick={() => this.onDeleteCourse('textbook', index)}
                                  >
                                    <Delete />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid container>
                      <ItemGrid xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Preference"
                          id="preferenceTemp"
                          name="preferenceTemp"
                          onChange={this.handleChange}
                          onKeyDown={this.onKeyDown}
                          inputProps={{
                            value: preferenceTemp,
                          }}
                          formControlProps={{
                            fullWidth: true,
                          }}
                        />
                      </ItemGrid>
                      <Table className={classes.table} style={{ marginBottom: '20px' }}>
                        <TableBody>
                          {
                            preference.map((pre, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {pre}
                                </TableCell>
                                <TableCell style={{ width: '15%' }}>
                                  <Button
                                    key="delete" variant="fab" mini color="secondary" aria-label="delete"
                                    classes={{ mini: classes.buttonMini }}
                                    onClick={() => this.onDeleteCourse('preference', index)}
                                  >
                                    <Delete />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </Grid>
                    <Grid container>
                      <Typography variant='title' gutterBottom paragraph>
                        Materials&nbsp;&nbsp;&nbsp;
                        <Button
                          key="add" variant="fab" mini color="secondary" aria-label="add"
                          classes={{ mini: classes.buttonMini }}
                          onClick={this.addMaterial}
                        >
                          <Add />
                        </Button>
                      </Typography>
                      <Table className={classes.table} style={{ marginBottom: '20px', wordBreak: 'break-all' }}>
                        <TableBody>
                          {
                            materials.map((ma, index) => (
                              <TableRow key={index}>
                                <TableCell style={{ width: '15%'}}>
                                  {
                                    ma.name === '' ? (
                                      <CustomInput
                                        labelText="Material name"
                                        id="materialTemp"
                                        name="materialTemp"
                                        onChange={this.handleChange}
                                        onKeyDown={(event) => this.onKeyDownMaterial(event, index)}
                                        inputProps={{
                                          value: materialTemp,
                                        }}
                                        formControlProps={{
                                          fullWidth: true,
                                        }}
                                      />
                                    ) : ma.name
                                  }
                                </TableCell>
                                <TableCell style={{ width: '30%'}}>
                                  {
                                    ma.filePath === '' ? (
                                      <FileBase64
                                        multiple={false}
                                        onDone={this.getFile}
                                      />
                                    ) : (
                                      <a href={ma.filePath} target='_blank'>Document</a>
                                    )
                                  }
                                </TableCell>
                                <TableCell style={{ width: '30%'}}>
                                  {
                                    ma.solutionPath === '' ? (
                                      <FileBase64
                                        multiple={false}
                                        onDone={this.getFile}
                                      />
                                    ) : (
                                      <a href={ma.filePath} target='_blank'>Solution</a>
                                    )
                                  }
                                </TableCell>
                                <TableCell style={{ width: '10%' }}>
                                  <Button
                                    key="delete" variant="fab" mini color="secondary" aria-label="delete"
                                    classes={{ mini: classes.buttonMini }}
                                    onClick={() => this.onDeleteMaterial(index)}
                                  >
                                    <Delete />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))
                          }
                        </TableBody>
                      </Table>
                    </Grid>
                  </div>
                }
                footer={<CustomButton color="primary" disabled={this.state.isSubmitting}
                                onClick={this.onSubmit}>Submit</CustomButton>}
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

const mapStateToProps = ({ app, role, course }) => ({
  app,
  role,
  course,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setEdit,
      editCourse,
      fetchCourse,
      addCourse,
      courseLoading,
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(appStyle)(Edit)));
