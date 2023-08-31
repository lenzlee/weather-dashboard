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
        var cityId = response.id;
        var cityWeatherData = $("<div col-12>").append($("<h2>" + response.name + ' (' + currentDate + ')' + "</h2>"));
        var icon = $('<img class="icon">').attr('src', 'http://openweathermap.org/img/w/' + response.weather[0].icon + '.png');  
        var temperatureInfo = $('<br><h4>').text('Temp: ' + response.main.temp + ' °F');
        var windInfo = $('<h4>').text('Wind: ' + response.wind.speed + 'MPH'); 
        var humidityInfo = $('<h4>').text('Humidity: ' + response.main.humidity + '%');
        
        cityWeatherData.append(icon).append(temperatureInfo).append(windInfo).append(humidityInfo);

        displayFiveDayForecast(cityId);

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
  function displayFiveDayForecast(city) {
    $.ajax({ // gets the 5 day forecast API
        url: "https://api.openweathermap.org/data/2.5/forecast?id=" + city + "&units=imperial&APPID=" + APIKey,
        method: "GET",
    }).then(function (response) {
       
        var arrayList = response.list;
        for (var i = 0; i < arrayList.length; i++) {
            if (arrayList[i].dt_txt.split(' ')[1] === '12:00:00') {
                console.log(arrayList[i]);
                
                var cityWeatherData = $('<div>');

                cityWeatherData.addClass('forecast bg-primary>');

                var days5 = $("<h5>").text(response.list[i].dt_txt.split(" ")[0]);

                var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/' + arrayList[i].weather[0].icon + '.png');

                var tempInfo = $('<p>').text('Temp: ' + arrayList[i].main.temp + ' °F');               

                var windInfo = $('<p>').text('Wind: ' + arrayList[i].wind.speed + 'MPH');    
                
                var humidityInfo = $('<p>').text('Humidity: ' + arrayList[i].main.humidity + '%');

                cityWeatherData.append(days5).append(icon).append(tempInfo).append(windInfo).append(humidityInfo);

                $('#forecast').append(cityWeatherData);
            }
        }
    });
};

  // Get data store from local storage function

  // Recent Cities Buttons List function


});