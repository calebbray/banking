import React from 'react';
import AppRouter from './routers/AppRouter';

import { Provider } from 'react-redux';
import store from '../store';

const App = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <AppRouter />
      </React.Fragment>
    </Provider>
  );
};

export default App;
