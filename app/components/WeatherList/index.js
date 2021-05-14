import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import Img from 'components/Img';

const Wrapper = styled.div`
  margin-bottom: 100px;
`;

const Table = styled.table`
  border-collapse: collapse;
  border: thin solid #ddd;
  text-align: center;
  table-layout: fixed;
  width: 100%;

  thead {
    font-weight: 500;
    border: thin solid #ddd;
    th {
      padding: 3px 6px;
    }
  }

  tbody tr.font-black {
    color: #18191a !important;
  }

  tbody tr.font-black.font-white {
    color: #ccc !important;
  }

  td,
  th {
    border-bottom: 0.5px solid #ccc;
    padding: 5px 10px;
  }
`;

function WeatherList({ loading, error, weather }) {
  if (loading) {
    return <LoadingIndicator />;
  }

  if (error !== false) {
    return <span>Something went wrong, please try again!</span>;
  }

  if (weather && weather.consolidated_weather) {
    const weatherList = weather.consolidated_weather;
    //  Based on temp
    const condition = weatherList[0].the_temp;
    let trClassName;
    if (condition < 30) {
      document.body.className = 'snow';
      trClassName = 'font-black';
    } else if (condition >= 30 && condition < 60) {
      document.body.className = 'cold';
      trClassName = 'font-white';
    } else {
      document.body.className = 'warm';
      trClassName = 'font-black';
    }

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const tableRows = weatherList.map(item => {
      // Return day as a string instead of an int.
      const day = new Date(item.applicable_date);
      const dayString = days[day.getDay()];
      const low = Math.floor(item.min_temp);
      const high = Math.floor(item.max_temp);
      const currentTemp = Math.floor(item.the_temp);

      return (
        <tr className={trClassName} key={item.id}>
          <td>
            <Img
              width="30"
              height="30"
              alt="weather-icon"
              src={`https://www.metaweather.com/static/img/weather/${
                item.weather_state_abbr
              }.svg`}
            />
          </td>
          <td>{dayString}</td>
          <td>{currentTemp}°</td>
          <td>{low}°</td>
          <td>{high}°</td>
          <td>{Math.round(item.wind_speed)}</td>
        </tr>
      );
    });

    const tableBody = <tbody>{tableRows}</tbody>;

    return (
      <Wrapper>
        <div>
          <Table>
            <thead>
              <tr>
                <th style={{ opacity: 0 }}>Icon</th>
                <th>Day</th>
                <th>Temp °F</th>
                <th>Low</th>
                <th>High</th>
                <th className="wind-speed">Wind (mph)</th>
              </tr>
            </thead>
            {tableBody}
          </Table>
        </div>
      </Wrapper>
    );
  }
  return null;
}

const { bool, any } = PropTypes;

WeatherList.propTypes = {
  loading: bool,
  error: any,
  weather: any,
};

export default WeatherList;
