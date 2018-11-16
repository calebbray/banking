import React from 'react';

import { connect } from 'react-redux';
import { login } from '../../actions/authorization';

const Login = () => {
  state = {
    email: '',
    password: ''
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.props.login();
    console.log(clicked);
  };

  return (
    <div>
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
        />
        <input
          type="password"
          name="password"
          value={this.state.password}
          onChange={this.onChange}
        />
        <input type="submit">Login</input>
      </form>
    </div>
  );
};

const mapStateToProps = state => ({
  auth: state.authenication
});

export default connect(
  mapStateToProps,
  { login }
)(Login);
