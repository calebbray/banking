import React, { Component } from 'react';
import { testCustomers } from '../../actions/test';

class Body extends Component {
  state = {
    count: 0
  };

  onClick = e => {
    this.setState({ count: this.state.count + 1 });
    testCustomers();
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.onClick}>Click Me!</button>
      </div>
    );
  }
}

export default Body;
