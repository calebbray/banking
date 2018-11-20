import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Body from '../layout/Body';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import Login from '../authorization/Login';

const AppRouter = () => {
  return (
    <Router>
      <React.Fragment>
        <Header />
        <Switch>
          <Route path="/" component={Body} exact />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </React.Fragment>
    </Router>
  );
};

export default AppRouter;
