/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.containers.HomePage';

export default defineMessages({
  startProjectHeader: {
    id: `${scope}.start_project.header`,
    defaultMessage: 'HackerRank test with ReactJS',
  },
  startProjectMessage: {
    id: `${scope}.start_project.message`,
    defaultMessage:
      'Create a React web app which can display a five day weather forecast based upon publicly available data.',
  },
  projectHeader: {
    id: `${scope}.project.header`,
    defaultMessage: 'Meta Weather',
  },
  projectMessage: {
    id: `${scope}.project.message`,
    defaultMessage: 'Show Weather information',
  },
});
