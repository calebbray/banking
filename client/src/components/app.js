import React from 'react';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Body from './layout/Body';

import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <Header />
        <Body />
        <Footer />
      </React.Fragment>
    </Provider>
  );
};

export default App;
