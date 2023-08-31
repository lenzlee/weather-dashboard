$(document).ready(function () {

  // display current date
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

  // set elements - API Key
  // API Key for all weather data 
var APIKey = "e7870e69c64fe6687d1c5339370055dd";
var city = "";

  // function for when the Search Button is clicked
  $('.searchBtn').on('click', function (event) {

    event.preventDefault();

    //get user input for City then save info to localStorage

    city = $("#formInputCity").val();
    if (city === '') {
        return alert('Enter City');
    }
    getWeatherInfo(city);

    saveInfoToLocalStorage(city);

  });

  //function for getting weather info
  function getWeatherInfo(city) {
    var queryAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;
    $.ajax({
        // gets the current weather info
        url: queryAPI,
        method: "GET",
        error: (err => { //If API through error then alert 
            alert("City not found")
            return;
          })
    }).then(function (response) {
        console.log(response)
    });
}

// function for saving info to localstorage
function saveInfoToLocalStorage(city) {
  var data = localStorage.getItem('cities-recently-searched');
  if (data) {
      console.log(data, city)

  } else {
      data = city;
      localStorage.setItem('cities-recently-searched', data);
  }
  if (data.indexOf(city) === -1) {
      data = data + ',' + city;
      localStorage.setItem('cities-recently-searched', data);
  }
}

  // 5 Day forecast display function

  // Get data store from local storage function

  // Recent Cities List function


});