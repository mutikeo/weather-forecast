import { CHANGE_LOCATION } from '../constants';

import { changeLocation } from '../actions';

describe('Home Actions', () => {
  describe('changeLocation', () => {
    it('should return the correct type and the passed name', () => {
      const location = { title: 'Ho Chi Minh' };
      const expectedResult = {
        type: CHANGE_LOCATION,
        location,
      };

      expect(changeLocation(location)).toEqual(expectedResult);
    });
  });
});
