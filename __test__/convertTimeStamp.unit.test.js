require("regenerator-runtime");
import {convertTimeStamp} from '../src/client/js/convertTimeStamp.js';

test('convertTimeStamp', () => {
  expect(convertTimeStamp(1581552000)).toBe('Wed Feb-12')
  expect(convertTimeStamp(1581638400)).toBe('Thu Feb-13')
});
