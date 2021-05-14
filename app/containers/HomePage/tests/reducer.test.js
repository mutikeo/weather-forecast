import produce from 'immer';

import homeReducer from '../reducer';
import { changeLocation } from '../actions';

/* eslint-disable default-case, no-param-reassign */
describe('homeReducer', () => {
  let state;
  beforeEach(() => {
    state = {
      location: '',
    };
  });

  it('should return the initial state', () => {
    const expectedResult = state;
    expect(homeReducer(undefined, {})).toEqual(expectedResult);
  });

  it('should handle the changeLocation action correctly', () => {
    const location = { title: 'Ho Chi Minh city' };
    const expectedResult = produce(state, draft => {
      draft.location = location;
    });

    expect(homeReducer(state, changeLocation(location))).toEqual(
      expectedResult,
    );
  });
});
