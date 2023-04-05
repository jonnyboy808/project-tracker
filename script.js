
// console.log(now)


function updateClock () {
    var now = dayjs().format('MMM D, YYYY h:mm:ss A');
    $('#currentDay').text(now);
}

// function updateClock () {
//   var currentTime = new Date ();
//   var currentHour = currentTime.getHours ();
//   var currentMinute = currentTime.getMinutes ();
//   var currentSeconds = currentTime.getSeconds ();

//   currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
//   currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;

//   var timeOfDay = ( currentHour < 12 ) ? "AM" : "PM";
//   currentHour = (currentHour > 12) ? currentHour - 12 : currentHour;
//   currentHour = (currentHour ==  0) ? 12 : currentHour;
//   var currentTimeString = currentHour + ":" + currentMinute + ":" + currentSeconds + " " + timeOfDay;
//   $("#currentTime").html(currentTimeString);
// }
$(document).ready(function() {
  setInterval(updateClock, 1000);
});