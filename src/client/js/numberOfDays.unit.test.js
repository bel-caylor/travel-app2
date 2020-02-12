require("regenerator-runtime");
const timeDiff = require('./defineTripDates.js');

test('end 10/5/2019 start 10/1/2019 equals 4 days', () => {
  expect(numberOfDays('2019-10-01','2019-10-05')).toBe(4);
});
