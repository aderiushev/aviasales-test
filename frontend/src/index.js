import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'connected-react-router';
import App from './containers/app';
import createStore from './store';
import http from './utils/http';

import './theme/global.less';

moment.locale('ru');

const history = createHistory();

const store = createStore(history);

http.init(store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
