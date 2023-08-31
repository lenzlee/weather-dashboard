$(document).ready(function () {

  // display current date
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // function for when the Search Button is clicked
  $('.searchBtn').on('click', function () {

    //get user input for City and save in localStorage
    // var userInput = $(this).siblings('textarea').val();
    // var currentTime = $(this).parent().attr('id');

    // localStorage.setItem(currentTime, userInput);
  });

  // load data from localStorage (city, date, temp, wind, humidity)
  // $('#hour-9 .description').val(localStorage.getItem('xxx'));

  // function to pull 5-Day forecast
  $(function weekForecast() {


  });

});