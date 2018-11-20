import React, { Component } from 'react';

import { connect } from 'react-redux';
import { login } from '../../actions/authorization';

class Login extends Component {
  state = {
    username: '',
    password: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const { username, password } = this.state;
    const credentials = { username, password };
    this.props.login(credentials);
    console.log('clicked');
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.onChange}
          />
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange}
          />
          <input type="submit" value="login" />
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.authenication
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
