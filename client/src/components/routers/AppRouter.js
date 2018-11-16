import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Body from '../layout/Body';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import TestComponent from '../layout/TestComponent';

const AppRouter = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Body} exact={true} />
          <Route path="/body" component={TestComponent} />
        </Switch>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default AppRouter;
