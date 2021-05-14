import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router-dom';
import { render } from 'react-testing-library';

import WeatherList from '../index';
import configureStore from '../../../configureStore';

describe('<WeatherList />', () => {
  it('should render the loading indicator when its loading', () => {
    const { container } = render(<WeatherList loading />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should render an error if loading failed', () => {
    const { queryByText } = render(
      <IntlProvider locale="en">
        <WeatherList loading={false} error={{ message: 'Loading failed!' }} />
      </IntlProvider>,
    );
    expect(queryByText(/Something went wrong/)).not.toBeNull();
  });

  it('should render the repositories if loading was successful', () => {
    const store = configureStore(
      { global: { currentUser: 'mxstbr' } },
      browserHistory,
    );
    const weather = {
      consolidated_weather: [
        {
          id: 6632819783630848,
          weather_state_name: 'Light Rain',
          weather_state_abbr: 'lr',
          wind_direction_compass: 'ENE',
          created: '2021-05-14T06:42:11.053452Z',
          applicable_date: '2021-05-14',
          min_temp: 26.625,
          max_temp: 33.230000000000004,
          the_temp: 33.239999999999995,
          wind_speed: 5.748216122829343,
          wind_direction: 61.72354333953718,
          air_pressure: 1007.5,
          humidity: 65,
          visibility: 8.705099717648931,
          predictability: 75,
        },
      ],
      time: '2021-05-14T14:59:20.565332+07:00',
      sun_rise: '2021-05-14T05:53:57.834510+07:00',
      sun_set: '2021-05-14T17:44:10.138401+07:00',
      timezone_name: 'LMT',
      parent: {
        title: 'Indonesia',
        location_type: 'Country',
        woeid: 23424846,
        latt_long: '0.109740,113.917397',
      },
      sources: [
        {
          title: 'BBC',
          slug: 'bbc',
          url: 'http://www.bbc.co.uk/weather/',
          crawl_rate: 360,
        },
      ],
      title: 'Jakarta',
      location_type: 'City',
      woeid: 1047378,
      latt_long: '-6.171440,106.827820',
      timezone: 'Asia/Jakarta',
    };
    const { container } = render(
      <Provider store={store}>
        <IntlProvider locale="en">
          <WeatherList weather={weather} error={false} />
        </IntlProvider>
      </Provider>,
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not render anything if nothing interesting is provided', () => {
    const { container } = render(
      <WeatherList weather={false} error={false} loading={false} />,
    );

    expect(container.firstChild).toBeNull();
  });
});
