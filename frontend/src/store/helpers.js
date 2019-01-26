import { handleActions } from 'redux-actions';
import { merge, omit, isArray } from 'lodash';

export const createDefaultState = (state = {}) => merge({}, state, {
  fetching: null,
  fetchError: null,
  data: null,
});

function createActionsHandler(types, defaultHandlers, defaultState = createDefaultState()) {
  const handler = types.reduce((acc, actionType, index) => {
    let type;
    let next = state => state;
    if (actionType.type) {
      type = actionType.type; // eslint-disable-line
      next = actionType.next || (state => state);
    } else {
      type = actionType;
    }
    acc[type] = (state, action) => next(defaultHandlers[index](state, action), action);
    return acc;
  }, {});
  return handleActions(handler, defaultState);
}

export const handleSetItems = (state, { payload }) => merge({}, state, {
  data: payload
});

export function handleFetchActions(types, defaultState = createDefaultState()) {
  const defaultHandlers = [
    (state, action) => ({
      ...state,
      fetching: true,
      params: action.payload,
    }),
    (state, action) => {
      const newState = handleSetItems(state, action);
      return { ...newState, fetching: false };
    },
    (state, action) => ({
      ...state,
      fetching: false,
      fetchError: action.payload,
    }),
  ];
  return createActionsHandler(types, defaultHandlers, defaultState);
}
