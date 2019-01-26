import { createActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import {
  isArray, get, identity, omit, isEmpty,
} from 'lodash';
import * as api from '../api/dashboard';
import {
  handleFetchActions,
} from './helpers';

/**
 actions
 */
export const actions = createActions({
  FETCH_DASHBOARD: [identity, (payload, meta) => meta],
  SET_DASHBOARD: [identity, (payload, meta) => meta],
  FETCH_DASHBOARD_FAILURE: identity,
});

/**
  sagas
 */
export function* fetchSaga({ payload, meta }) {
  try {
    const resp = yield call(api.fetch, payload);

    yield put(actions.setDashboard(resp.data, meta));
  } catch (e) {
    yield put(actions.fetchDashboardFailure(e));
  }
}

export function* dashboardSaga() {
  yield takeLatest(actions.fetchDashboard, fetchSaga);
}

export default (state, action) => {
  // todo: composition helper
  const fetch = handleFetchActions([
    actions.fetchDashboard,
    actions.setDashboard,
    actions.fetchDashboardFailure,
  ]);
  return fetch(state, action);
};
