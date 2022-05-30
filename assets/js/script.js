//api call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}

var API_Key ='cba0d561fef3195ac96f2d675321d911'

//api Coordinates by city name https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// EX. https://api.openweathermap.org/data/2.5/onecall?
// on screen///
var citySearchFromEl = document.querySelector("#citySearchForm");
var cityInputEl = document.querySelector("#city-input");
var weatherInfoEl = document.querySelector("#weather-info");
var day1El = document.querySelector("#day-1");
var day2El = document.querySelector("#day-2");
var day3El = document.querySelector("#day-3");
var day4El = document.querySelector("#day-4");
var day5El = document.querySelector("#day-5");
var recentSearch1= document.querySelector("#recent-search-1");

var weatherVariables = {
    id: "",
    temp: "",
    wind: "",
    humidity: "",
    uvIndex: "",
};



//Submit click////////
var formSubmitHandler = function(NewCity) {
    event.preventDefault();

    var city = cityInputEl.value.trim() || NewCity;

    if(city) {
        getCityCoords(city);
        cityInputEl.value ="";
        weatherInfoEl.textContent ="";
        day1EL.textContent ="";
        day2El.textContent ="";
        day3El.textContent ="";
        day4El.textContent ="";
        day5El.textContent ="";
        grabCityName(city);
    } else {
        alert("Please enter a city");
    }
};


// city -> lat and lon coordinates
var getCityCoords = function(city) {

    var ApiCoordinates = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + API_Key);

    fetch(ApiCoordinates).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var pickedCity = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=" + API_Key);
                displayWeather(pickedCity);
                displayForecast(pickedCity);
                displayForecast2(pickedCity);
                displayForecast3(pickedCity);
                displayForecast4(pickedCity);
                displayForecast5(pickedCity);
            });
        } else {
            alert("Error: City Not Found")
        }
    })
    .catch(function(error) {
        alert("Error to connect to openweathermap.org");
    });
};


// get city name for the openweathermap api and renders it on the screen
var grabCityName = function(city) {
    var cityName = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + API_Key);

    fetch(cityName).then(function(response) {
        response.json().then(function(data) {

            var currentWeatherEl = document.createElement("h4");
            currentWeatherEl.textContent =data[0].name + "(" + moment().format('1') + ")"
            weatherInfoEl.classList.add('weather-info');
            weatherInfoEl.append(currentWeatherEl);
        });
    })
};
// 5 day Forecast///


// Day 1 ////
var displayForecast = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            //Display Date
            var DateEl = document.createElement("h6")
            DateEl.textContent = moment().add(1, 'days').format('1')
            day1El.append(DateEl);

            //Display Icon
            var displayIconEl = document.createElement("img")
            displayIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"
            day1El.append(displayIconEl);

            //Display Temp 
            var displayTempEl = document.createElement("p")
            displayTempEl.textContent = "Temp: " + data.daily[0].temp.day + "\xB0F"
            day1El.append(displayTempEl);

            // current wind
            var displayWindEl = document.createElement("p")
            displayWindEl.textContent = "Wind: " + data.daily[0].wind_speed + "MPH"
            day1El.append(displayWindEl);

            // Display Humidity
            var displayHumidityEl = document.createElement("p")
            displayHumidityEl.textContent = "Humidity: " + data.daily[0].humidity + "%"
            day1El.append(displayHumidityEl);

            day1El.classList.add('5DayForcast');
        });

    });
};
