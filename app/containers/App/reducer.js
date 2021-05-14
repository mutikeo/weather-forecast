/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';

import {
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
  LOAD_WEATHER,
  LOAD_WEATHER_SUCCESS,
  LOAD_WEATHER_ERROR,
  RESET_ALL,
} from './constants';

// The initial state of the App
export const initialState = {
  loading: false,
  locationLoading: false,
  error: false,
  currentLocation: false,
  locationData: [],
  weatherData: [],
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case RESET_ALL:
        draft.locationLoading = false;
        draft.loading = false;
        draft.error = false;
        draft.locationData = [];
        draft.weatherData = [];
        break;

      case LOAD_LOCATION:
        draft.locationLoading = true;
        draft.error = false;
        draft.locationData = [];
        break;

      case LOAD_LOCATION_SUCCESS:
        draft.locationData = action.locations;
        draft.locationLoading = false;
        break;

      case LOAD_LOCATION_ERROR:
        draft.error = action.error;
        draft.locationLoading = false;
        break;

      case LOAD_WEATHER:
        draft.loading = true;
        draft.error = false;
        draft.weatherData = [];
        break;

      case LOAD_WEATHER_SUCCESS:
        draft.weatherData = action.weather;
        draft.loading = false;
        break;

      case LOAD_WEATHER_ERROR:
        draft.error = action.error;
        draft.loading = false;
        break;
    }
  });

export default appReducer;
