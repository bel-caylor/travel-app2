function convertTimeStamp (timeStamp){
 const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
 const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
 let date = new Date(timeStamp*1000);
 let weekday = weekdays[date.getDay()];
 let month = months[date.getMonth()];
 let day = date.getDate();
 return weekday + ' ' + month +  '-' + day;
};

export {convertTimeStamp};
