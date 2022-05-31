//api call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={APIkey}

var API_Key ='cba0d561fef3195ac96f2d675321d911'




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

    var city = cityInputEl.value.trim() || NewCity;

    if(city) {
        getCityCoords(city);
        cityInputEl.value ="";
        weatherInfoEl.textContent ="";
        day1El.textContent ="";
        day2El.textContent ="";
        day3El.textContent ="";
        day4El.textContent ="";
        day5El.textContent ="";
        grabCityName(city);
    } else {
        alert("Please enter a city");
    }
};

citySearchFormEl.addEventListener('submit', formSubmitHandler);

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

var displayWeather = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            //shows Icons 
            var extantIconEl = document.createElement("img")
            extantIconEl.src = "http://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"
            weatherInfoEl.append(extantIconEl)

            //Shows Current Temp
            var extantTempEl = document.createElement("p")
            extantTempEl.textContent = "Temp: " + data.current.temp + "\xB0F"
            weatherInfoEl.append(extantTempEl);

            //Shows Current Wind Speed
            var extantWindSpeedEl = document.createElement("p")
            extantWindSpeedEl.textContent = "Wind Speed: " + data.current.wind_speed + " MPH"
            weatherInfoEl.append(extantWindSpeedEl);

            //Shows Current Humidity
            var extantHumidityEl = document.createElement("p")
            extantHumidityEl.textContent = "Humidity: " + data.current.humidity + "%"
            weatherInfoEl.append(extantHumidityEl);

            //Shows Current UV Index with a color
            var UVIndexDiv = document.createElement("div");
            weatherInfoEl.append(UVIndexDiv)
            UVIndexDiv.classList.add("uv-index-div")

            var UVIndex = document.createElement("p")
            UVIndex.textContent = "UV Index: " 

            var extantUVIndexEl = document.createElement("p")
            extantUVIndexEl.textContent = data.current.uvi
            if (data.current.uvi < 2) {extantUVIndexEl.classList.add("uv-index-green")
            } else if (data.current.uvi < 5) {extantUVIndexEl.classList.add("uv-index-yellow")
            } else {extantUVIndexEl.classList.add("uv-index-red")}
            UVIndexDiv.append(UVIndex, extantUVIndexEl);
        });
    });

};

// // get city name for the openweathermap api and renders it on the screen
var grabCityName = function(city) {
    var cityName = ("https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + API_Key);

    fetch(cityName).then(function(response) {
        response.json().then(function(data) {

            var currentWeatherEl = document.createElement("h4");
            currentWeatherEl.textContent =data[0].name + " (" + moment().format('l') + ")"
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

            // Shows Date
            var extantDateEl = document.createElement("h5")
            extantDateEl.textContent = moment().add(1, 'days').format('l')
            day1El.append(extantDateEl);

       //shows Icons 
        // console.log (data.daily[0].weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + ".png"
        day1El.append(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.daily[0].temp.day + "\xB0F"
        day1El.append(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.daily[0].wind_speed + " MPH"
        day1El.append(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.daily[0].humidity + "%"
        day1El.append(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.daily[0].uvi
        day1El.append(extantUVIndexEl);

            day1El.classList.add('fiveDay-box');
        });

    });
};


// Day 2 ////
var displayForecast2 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

             // Shows Date
                var extantDateEl = document.createElement("h5")
                extantDateEl.textContent = moment().add(2, 'days').format('l')
                day2El.append(extantDateEl);

       //shows Icons 
        // console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png"
        day2El.append(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.daily[1].temp.day + "\xB0F"
        day2El.append(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.daily[1].wind_speed + " MPH"
        day2El.append(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.daily[1].humidity + "%"
        day2El.append(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.daily[1].uvi
        day2El.append(extantUVIndexEl);

            day2El.classList.add('fiveDay-box');
        });

    });
};

// Day 3 ////
var displayForecast3 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            // Shows Date
            var extantDateEl = document.createElement("h5")
            extantDateEl.textContent = moment().add(3, 'days').format('l')
            day3El.append(extantDateEl);
       //shows Icons 
        // console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png"
        day3El.append(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.daily[2].temp.day + "\xB0F"
        day3El.append(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.daily[2].wind_speed + " MPH"
        day3El.append(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.daily[2].humidity + "%"
        day3El.append(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.daily[2].uvi
        day3El.append(extantUVIndexEl);

            day3El.classList.add('fiveDay-box');
        });

    });
};

// Day 4 ////
var displayForecast4 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            // Shows Date
            var extantDateEl = document.createElement("h5")
            extantDateEl.textContent = moment().add(4, 'days').format('l')
            day4El.append(extantDateEl);

       //shows Icons 
        // console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png"
        day4El.append(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.daily[3].temp.day + "\xB0F"
        day4El.append(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.daily[3].wind_speed + " MPH"
        day4El.append(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.daily[3].humidity + "%"
        day4El.append(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.daily[3].uvi
        day4El.append(extantUVIndexEl);

            day4El.classList.add('fiveDay-box');
        });

    });
};

// Day 5 ////
var displayForecast5 = function(pickedCity) {
    fetch(pickedCity).then(function(response) {
        response.json().then(function(data) {

            // Shows Date
            var extantDateEl = document.createElement("h5")
            extantDateEl.textContent = moment().add(5, 'days').format('l')
            day5El.append(extantDateEl);
       //shows Icons 
        // console.log (data.current.weather[0].icon);
        var extantIconEl = document.createElement("img")
        extantIconEl.src = "http://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png"
        day5El.append(extantIconEl)

       //Shows Current Temp
        var extantTempEl = document.createElement("p")
        extantTempEl.textContent = "Temp: " + data.daily[4].temp.day + "\xB0F"
        day5El.append(extantTempEl);

       //Shows Current Wind Speed
        var extantWindSpeedEl = document.createElement("p")
        extantWindSpeedEl.textContent = "Wind Speed: " + data.daily[4].wind_speed + " MPH"
        day5El.append(extantWindSpeedEl);

       //Shows Current Humidity
        var extantHumidityEl = document.createElement("p")
        extantHumidityEl.textContent = "Humidity: " + data.daily[4].humidity + "%"
        day5El.append(extantHumidityEl);

       //Shows Current UV Index
        var extantUVIndexEl = document.createElement("p")
        extantUVIndexEl.textContent = "UV Index: " + data.daily[4].uvi
        day5El.append(extantUVIndexEl);

            day5El.classList.add('fiveDay-box');
        });

    });
};

var recentSearch1El = document.querySelector('#recent-search-1');
// got from stackoverflow.com/

var storedSearches = function (event) {

    event.preventDefault();
var entries = JSON.parse(localStorage.getItem('allCities'));
    if (entries === null) entries = [];
    var cityInput = cityInputEl.value.trim();
    var city = {cityList: cityInput};

    localStorage.setItem('allCities', JSON.stringify(city));
    entries.push(city);
    localStorage.setItem('allCities', JSON.stringify(entries));
    if (cityInput) {
        for (var i = 0; i < entries.length; i++) {
            var cityOne = JSON.parse(localStorage.getItem('fiveCities'))

            var searchOne = document.createElement('button');
            searchOne.textContent = cityOne.slice(-1)[0].cityList;
            recentSearch1El.appendChild(searchOne);
        };
    }
    searchOne.addEventListener('click', function(e) {
        var NewCity = e.target.innerText
        formSubmitHandler(NewCity);
    });
};


citySearchFormEl.addEventListener('submit', function() {
    storedSearches(event);
    formSubmitHandler(event);
});