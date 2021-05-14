/**
 * Gets the repositories of the user from Github
 */

import { call, put, takeLatest } from 'redux-saga/effects';
import { LOAD_LOCATION, LOAD_WEATHER } from 'containers/App/constants';
import {
  locationsLoaded,
  locationLoadingError,
  weatherLoaded,
  weatherLoadingError,
} from 'containers/App/actions';

import request from 'utils/request';

const ROOT_URL = 'https://meta-weather-gilt.vercel.app/api/location';

/**
 * metaweather locations request/response handler
 */
export function* getLocations({ query }) {
  if (!query) return false;
  const requestURL = `${ROOT_URL}/search/?query=${query}`;

  try {
    // Call our request helper (see 'utils/request')
    const locations = yield call(request, requestURL);
    yield put(locationsLoaded(locations));
  } catch (err) {
    yield put(locationLoadingError(err));
  }
  return true;
}

export function* getWeather({ query }) {
  if (!query || !query.woeid) return false;
  const requestURL = `${ROOT_URL}/${query.woeid}/`;

  try {
    // Call our request helper (see 'utils/request')
    const weather = yield call(request, requestURL);
    yield put(weatherLoaded(weather));
  } catch (err) {
    yield put(weatherLoadingError(err));
  }
  return true;
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* rootSagaData() {
  // Watches for LOAD_LOCATION actions and calls getLocations when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_LOCATION, getLocations);
  yield takeLatest(LOAD_WEATHER, getWeather);
}
