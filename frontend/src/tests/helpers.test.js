import {
  handleFetchActions,
  handleUpdateActions,
  handleDeleteActions,
  createDefaultState,
} from '../store/helpers';

describe('store helpers', () => {
  describe('handle fetch actions', () => {
    let initialState;
    let handleAction;
    let next;

    beforeEach(() => {
      next = jest.fn(state => state);
      initialState = createDefaultState();
      handleAction = handleFetchActions([
        { type: 'START', next },
        { type: 'SUCCESS', next },
        { type: 'FAIL', next },
      ]);
    });

    it('should handle fetch start', () => {
      const action = { type: 'START', payload: { params: { name: 'name' } } };
      const state = handleAction(initialState, action);
      expect(state).toEqual({
        ...initialState,
        fetching: true,
        params: action.payload.params,
      });
    });
    it('should handle fetch success', () => {
      const action = {
        type: 'SUCCESS',
        payload: [{ id: 1, name: 'name' }],
      };
      const state = handleAction(initialState, action);
      expect(state).toEqual({
        ...initialState,
        fetching: false,
        items: { 1: { id: 1, name: 'name' } },
      });
    });
    it('should handle fetch failure', () => {
      const action = { type: 'FAIL', payload: new Error() };
      const state = handleAction(initialState, action);
      expect(state).toEqual({
        ...initialState,
        fetchError: action.payload,
      });
    });
  });
});
