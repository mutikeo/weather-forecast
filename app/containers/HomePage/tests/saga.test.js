/**
 * Tests for HomePage sagas
 */

import { put, takeLatest } from 'redux-saga/effects';

import { LOAD_LOCATION } from 'containers/App/constants';
import { locationsLoaded, locationLoadingError } from 'containers/App/actions';

import rootSagaData, { getLocations } from '../saga';

const username = 'mutikeo';

/* eslint-disable redux-saga/yield-effects */
describe('getLocations Saga', () => {
  let getLocationsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getLocationsGenerator = getLocations();

    const selectDescriptor = getLocationsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getLocationsGenerator.next(username).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('should dispatch the locationsLoaded action if it requests the data successfully', () => {
    const response = [
      {
        name: 'First repo',
      },
      {
        name: 'Second repo',
      },
    ];
    const putDescriptor = getLocationsGenerator.next(response).value;
    expect(putDescriptor).toEqual(put(locationsLoaded(response, username)));
  });

  it('should call the locationLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getLocationsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(locationLoadingError(response)));
  });
});

describe('rootSagaDataSaga Saga', () => {
  const rootSagaDataSaga = rootSagaData();

  it('should start task to watch for LOAD_LOCATION action', () => {
    const takeLatestDescriptor = rootSagaDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_LOCATION, getLocations),
    );
  });
});
