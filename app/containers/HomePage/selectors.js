/**
 * Homepage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectHome = state => state.home || initialState;

const makeSelectLocation = () =>
  createSelector(
    selectHome,
    homeState => homeState.location,
  );

export { selectHome, makeSelectLocation };
