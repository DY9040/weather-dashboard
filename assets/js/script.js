//api call https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

const APIKey = "bebfddd4f8eb58703065f33ecf495871"

//api Coordinates by city name http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



// on screen///
const citySearchFromEl = document.querySelector("#city-search-form");
const cityInputEl = document.querySelector("#city-input");
const weatherInfoEl = document.querySelector("#weather-info");
const day1El = document.querySelector("#day-1");
const day2El = document.querySelector("#day-2");
const day3El = document.querySelector("#day-3");
const day4El = document.querySelector("#day-4");
const day5El = document.querySelector("#day-5");
const recentSearch1= document.querySelector("#recent-search-1");

