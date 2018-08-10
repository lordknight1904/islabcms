import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Route } from "react-router-dom";
import { ConnectedRouter } from 'react-router-redux';
// import registerServiceWorker from './registerServiceWorker';

import store, { history } from './store';
import App from './components/App';

import './index.css';

const target = document.getElementById('root');

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <Route component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target,
);
// registerServiceWorker();
