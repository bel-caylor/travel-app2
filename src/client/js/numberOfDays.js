function numberOfDays(start, end) {
  var startDate = new Date(start);
  var endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return diff/(1000*60*60*24);  //(1000*60*60*24) milliseconds in a day
};

module.exports = numberOfDays;
