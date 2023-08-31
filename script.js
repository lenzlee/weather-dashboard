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

        $(".cityInformationBox").empty()

        var now = moment();
        var currentDate = now.format('MMMM D, YYYY');
        var cityWeatherData = $("<div col-12>").append($("<h2>" + response.name + ' (' + currentDate + ')' + "</h2>"));
        var icon = $('<img class="icon">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');  
        var temperatureInfo = $('<br><h4>').text('Temp: ' + response.main.temp + ' °F');
        var windInfo = $('<h4>').text('Wind: ' + response.wind.speed + 'MPH'); 
        var humidityInfo = $('<h4>').text('Humidity: ' + response.main.humidity + '%');
        
        cityWeatherData.append(icon).append(temperatureInfo).append(windInfo).append(humidityInfo);

        $('#CityInfo').append(cityWeatherData);

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