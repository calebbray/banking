import React, { Component } from 'react';
// import { testCustomers } from '../../actions/test';
import { connect } from 'react-redux';
import { count, increment, decrement } from '../../actions/test';

class Body extends Component {
  onClick = e => {
    this.props.count();
    // testCustomers();
    console.log(this.props.thecount.count);
    e.preventDefault();
  };

  upincrement = e => {
    this.props.increment();
    e.preventDefault();
  };

  downincrement = e => {
    this.props.decrement();
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Count: {this.props.thecount.count}</h1>
        <h2>Increment: {this.props.thecount.increment}</h2>
        <button onClick={this.onClick}>Click Me!</button>
        <br />
        <button onClick={this.downincrement}>Decrease Increment</button>
        <button onClick={this.upincrement}>Increase Increment</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  thecount: state.count
});

export default connect(
  mapStateToProps,
  { count, increment, decrement }
)(Body);
