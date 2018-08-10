import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  onClick = () => {
    console.log(this.state.username);
    console.log(this.state.password);
  };

  render() {
    return (
      <Paper
        elevation={4}
        style={{
          width: '50%',
          paddingBottom: '20px',
          paddingTop: '20px',
          margin: '0 auto',
          transform: 'translateY(50%)',
        }}
      >
        <Grid container justify='center' alignItems='center' alignContent='center'
              style={{ width: '100%', padding: '0 20px' }}>
          <Grid item xs={12} md={12}>
            <Typography variant="headline" gutterBottom>
              CMS
            </Typography>
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="username"
              label="Username"
              value={this.state.username}
              onChange={this.handleChange('username')}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              id="password"
              label="Password"
              type="password"
              margin="normal"
              value={this.state.password}
              onChange={this.handleChange('password')}
              fullWidth
            />
          </Grid>
          <Grid item xs={3} md={3}>
            <Button fullWidth margin="normal" variant="raised" color="primary" onClick={this.onClick}>
              Log in
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

Login.propTypes = {
  app: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

const mapStateToProps = ({ app }) => ({
  app,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
    },
    dispatch,
  );
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
