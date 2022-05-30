//api call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}

var API_Key ='cba0d561fef3195ac96f2d675321d911'

//api Coordinates by city name https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// EX. https://api.openweathermap.org/data/2.5/onecall?
// on screen///

// var cityName = "Richmond"
// var Coordinates =("http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=cba0d561fef3195ac96f2d675321d911");

// fetch(Coordinates).then((response) => {
// response.json().then((data) => {
// console.log("https://api.openweathermap.org/data/2.5/oncall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&appid=cba0d561fef3195ac96f2d675321d911")
// });

// });



var citySearchFormEl = document.querySelector("#citySearchForm");
var cityInputEl = document.querySelector("#city-input");
var weatherInfoEl = document.querySelector("#weather-info");
var locationEl = document.querySelector("#location");
var day1El = document.querySelector("#day-1");
var day2El = document.querySelector("#day-2");
var day3El = document.querySelector("#day-3");
var day4El = document.querySelector("#day-4");
var day5El = document.querySelector("#day-5");
var recentSearch1= document.querySelector("#recent-search-1");



// // //Submit click////////
var formSubmitHandler = function(event) {
    event.preventDefault();

    var city = cityInputEl.value.trim()

    if(city) {
        getCityCoords(city);
        cityInputEl.value ="";
        weatherInfoEl.textContent ="";
        // day1EL.textContent ="";
        // day2El.textContent ="";
        // day3El.textContent ="";
        // day4El.textContent ="";
        // day5El.textContent ="";
        grabCityName(city);
    } else {
        alert("Please enter a city");
    }
};

citySearchFormEl.addEventListener('submit', formSubmitHandler);

// city -> lat and lon coordinates
var getCityCoords = function(city) {
    var ApiCoordinates = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=cba0d561fef3195ac96f2d675321d911");
        fetch(ApiCoordinates).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
                var pickedCity = ("https://api.openweathermap.org/data/2.5/onecall?lat=" + data[0].lat + "&lon=" + data[0].lon + "&units=imperial&appid=cba0d561fef3195ac96f2d675321d911");
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

var displayWeather = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            //shows Icons 
            console.log (data.current.weather[0].icon);
            var extantIconEl = document.createElement("img")
            extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            weatherInfoEl.appendChild(extantIconEl)

            //Shows Current Temp
            var extantTempEl = document.createElement("p")
            extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
            weatherInfoEl.appendChild(extantTempEl);

            //Shows Current Wind Speed
            var extantWindSpeedEl = document.createElement("p")
            extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
            weatherInfoEl.appendChild(extantWindSpeedEl);

            //Shows Current Humidity
            var extantHumidityEl = document.createElement("p")
            extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
            weatherInfoEl.appendChild(extantHumidityEl);

            //Shows Current UV Index
            var extantUVIndexEl = document.createElement("p")
            extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
            weatherInfoEl.appendChild(extantUVIndexEl);
        });
    });

};

// // get city name for the openweathermap api and renders it on the screen
var grabCityName = function(city) {
    var cityName = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=cba0d561fef3195ac96f2d675321d911");

    fetch(cityName).then(function(response) {
        response.json().then(function(data) {
            console.log(data);

            var currentWeatherEl = document.createElement("h4");
            currentWeatherEl.textContent =data[0].name + "(" + moment().format('1') + ")"
//             weatherInfoEl.classList.add('weather-info');
            weatherInfoEl.append(currentWeatherEl);
        });
    })
};
// 5 day Forecast///


// Day 1 ////
var displayForecast = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

       //shows Icons 
        console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        day1El.appendChild(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
        day1El.appendChild(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
        day1El.appendChild(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
        day1El.appendChild(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
        day1El.appendChild(extantUVIndexEl);

            day1El.classList.add('fiveDay-box');
        });

    });
};


// Day 2 ////
var displayForecast2 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

       //shows Icons 
        console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        day2El.appendChild(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
        day2El.appendChild(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
        day2El.appendChild(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
        day2El.appendChild(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
        day2El.appendChild(extantUVIndexEl);

            day2El.classList.add('fiveDay-box');
        });

    });
};

// Day 3 ////
var displayForecast3 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

       //shows Icons 
        console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        day3El.appendChild(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
        day3El.appendChild(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
        day3El.appendChild(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
        day3El.appendChild(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
        day3El.appendChild(extantUVIndexEl);

            day3El.classList.add('fiveDay-box');
        });

    });
};

// Day 4 ////
var displayForecast4 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

       //shows Icons 
        console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        day4El.appendChild(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
        day4El.appendChild(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
        day4El.appendChild(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
        day4El.appendChild(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
        day4El.appendChild(extantUVIndexEl);

            day4El.classList.add('fiveDay-box');
        });

    });
};

// Day 5 ////
var displayForecast5 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

       //shows Icons 
        console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + ".png"
        day5El.appendChild(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
        day5El.appendChild(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
        day5El.appendChild(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
        day5El.appendChild(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.current.uvi
        day5El.appendChild(extantUVIndexEl);

            day5El.classList.add('fiveDay-box');
        });

    });
};