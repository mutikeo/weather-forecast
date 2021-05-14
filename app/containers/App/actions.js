/*
 * App Actions
 */

import {
  LOAD_LOCATION,
  LOAD_LOCATION_SUCCESS,
  LOAD_LOCATION_ERROR,
  LOAD_WEATHER,
  LOAD_WEATHER_SUCCESS,
  LOAD_WEATHER_ERROR,
  RESET_ALL,
} from './constants';

/**
 * Load the locations, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_LOCATION
 */
export function loadLocations(query) {
  return {
    type: LOAD_LOCATION,
    query,
  };
}

/**
 * Dispatched when the locations are loaded by the request saga
 *
 * @param  {array} locations The locations data
 *
 * @return {object}      An action object with a type of LOAD_LOCATION_SUCCESS passing the locations
 */
export function locationsLoaded(locations) {
  return {
    type: LOAD_LOCATION_SUCCESS,
    locations,
  };
}

/**
 * Dispatched when loading the location fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_LOCATION_ERROR passing the error
 */
export function locationLoadingError(error) {
  return {
    type: LOAD_LOCATION_ERROR,
    error,
  };
}

/**
 * Load the locations, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_WEATHER
 */
export function loadWeather(query) {
  return {
    type: LOAD_WEATHER,
    query,
  };
}

/**
 * Dispatched when the weather are loaded by the request saga
 *
 * @param  {array} weather The weather data
 *
 * @return {object}      An action object with a type of LOAD_WEATHER_SUCCESS passing the weather
 */
export function weatherLoaded(weather) {
  return {
    type: LOAD_WEATHER_SUCCESS,
    weather,
  };
}

/**
 * Dispatched when loading the location fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_WEATHER_ERROR passing the error
 */
export function weatherLoadingError(error) {
  return {
    type: LOAD_WEATHER_ERROR,
    error,
  };
}

export function resetAll() {
  return {
    type: RESET_ALL,
  };
}
