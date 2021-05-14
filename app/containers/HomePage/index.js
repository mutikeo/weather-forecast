/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  makeSelectLocations,
  makeSelectLoading,
  makeSelectLocationLoading,
  makeSelectError,
  makeSelectWeather,
} from 'containers/App/selectors';
import H2 from 'components/H2';
import WeatherList from 'components/WeatherList';
import AutoComplete from 'components/AutoComplete';
import CenteredSection from './CenteredSection';
import Section from './Section';
import messages from './messages';
import { loadLocations, loadWeather, resetAll } from '../App/actions';
import reducer from './reducer';
import saga from './saga';

const key = 'home';

export function HomePage({
  loading,
  error,
  locations,
  locationLoading,
  weather,
  onLoadWeather,
  onChangeLocation,
  onReset,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const weatherListProps = {
    loading,
    error,
    weather,
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React App: get weather info from metaweather.com"
        />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>
            <FormattedMessage {...messages.startProjectHeader} />
          </H2>
          <p>
            <FormattedMessage {...messages.startProjectMessage} />
          </p>
        </CenteredSection>
        <Section>
          <H2>
            <FormattedMessage {...messages.projectHeader} />
          </H2>
          <Section>
            <p>
              <FormattedMessage {...messages.projectMessage} />
            </p>
            <AutoComplete
              onChange={onChangeLocation}
              onSelect={onLoadWeather}
              onReset={onReset}
              options={locations}
              isLoading={locationLoading}
            />
          </Section>
          <WeatherList {...weatherListProps} />
        </Section>
      </div>
    </article>
  );
}

const { bool, oneOfType, object, array, string, func } = PropTypes;

HomePage.propTypes = {
  loading: bool,
  locationLoading: bool,
  error: oneOfType([object, bool]),
  locations: oneOfType([array, bool]),
  onLoadWeather: func,
  onReset: func,
  location: string,
  weather: oneOfType([array, bool]),
  onChangeLocation: func,
};

const mapStateToProps = createStructuredSelector({
  locations: makeSelectLocations(),
  locationLoading: makeSelectLocationLoading(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  weather: makeSelectWeather(),
});

export function mapDispatchToProps(dispatch) {
  return {
    onChangeLocation: value => dispatch(loadLocations(value.trim())),
    onLoadWeather: value => dispatch(loadWeather(value)),
    onReset: () => dispatch(resetAll()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
