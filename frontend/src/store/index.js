import { applyMiddleware, combineReducers, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { reducer as formReducer } from 'redux-form';
import dashboard, { dashboardSaga } from './dashboard';

const sagaMiddleware = createSagaMiddleware();

export default (history) => {
  const store = createStore(
    combineReducers({
      dashboard,
      form: formReducer,
      router: connectRouter(history),
    }),
    applyMiddleware(sagaMiddleware, thunkMiddleware, routerMiddleware(history), createLogger()),
  );
  function* runSagas() {
    yield* dashboardSaga();
  }
  sagaMiddleware.run(runSagas);
  return store;
};
