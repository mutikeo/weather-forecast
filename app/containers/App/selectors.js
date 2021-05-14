/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

const makeSelectCurrentLocation = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.currentLocation,
  );

const makeSelectLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.loading,
  );

const makeSelectLocationLoading = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.locationLoading,
  );

const makeSelectError = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.error,
  );

const makeSelectLocations = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.locationData,
  );

const makeSelectWeather = () =>
  createSelector(
    selectGlobal,
    globalState => globalState.weatherData,
  );

const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export {
  selectGlobal,
  makeSelectCurrentLocation,
  makeSelectLocationLoading,
  makeSelectLoading,
  makeSelectError,
  makeSelectLocations,
  makeSelectLocation,
  makeSelectWeather,
};
