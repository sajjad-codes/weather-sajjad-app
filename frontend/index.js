let cityName = document.querySelector(".weather_city");
let datetime = document.querySelector(".weather_date_time");
let w_forecast = document.querySelector(".weather_forecast");
let w_icon = document.querySelector(".weather_icon");
let w_temperature = document.querySelector(".weather_temperature");
let w_minTem = document.querySelector(".weather_min");
let w_maxTem = document.querySelector(".weather_max");
let w_feelsLike = document.querySelector(".weather_feelsLike");
let w_humidity = document.querySelector(".weather_humidity");
let w_wind = document.querySelector(".weather_wind");
let w_pressure = document.querySelector(".weather_pressure");
let citySearch = document.querySelector(".weather_search");

const skyBg = document.querySelector(".sky-bg");

let city = "patna";

const getCountryName = (code) => {
return new Intl.DisplayNames(["en"], { type: "region" }).of(code);
};

const getDateTime = (dt) => {

const curDate = new Date(dt * 1000);

const options = {
weekday: "long",
year: "numeric",
month: "long",
day: "numeric",
hour: "numeric",
minute: "numeric",
second: "numeric",
};

return new Intl.DateTimeFormat("en-US", options).format(curDate);

};

citySearch.addEventListener("submit", (e)=>{

e.preventDefault();

const cityInput = document.querySelector(".city_name");

city = cityInput.value;

getWeatherData();

cityInput.value = "";

});

const getWeatherData = async ()=>{

try{

const weatherUrl = `https://weather-sajjad-app.onrender.com/weather/${city}`;
const res = await fetch(weatherUrl);

const data = await res.json();

console.log(data);

if(data.cod === "404"){
alert("City not found");
return;
}

const {main,name,weather,wind,sys,dt} = data;

cityName.innerHTML = `${name}, ${getCountryName(sys.country)}`;

datetime.innerHTML = getDateTime(dt);

w_forecast.innerHTML = weather[0].main;

w_icon.innerHTML =
`<img src="https://openweathermap.org/img/wn/${weather[0].icon}@4x.png">`;

w_temperature.innerHTML = `${main.temp}°C`;

w_minTem.innerHTML = `min: ${main.temp_min}°C`;

w_maxTem.innerHTML = `max: ${main.temp_max}°C`;

w_feelsLike.innerHTML = `${main.feels_like}°C`;

w_humidity.innerHTML = `${main.humidity}%`;

w_wind.innerHTML = `${wind.speed} m/s`;

w_pressure.innerHTML = `${main.pressure} hPa`;

if(weather[0].main.toLowerCase().includes("rain")){

skyBg.style.background =
"linear-gradient(to top,#5f7fa3,#a0c4d6)";

}
else if(weather[0].main.toLowerCase().includes("cloud")){

skyBg.style.background =
"linear-gradient(to top,#aab9d3,#d1d9e6)";

}
else{

skyBg.style.background =
"linear-gradient(to top,#87ceeb,#e0f7fa)";

}

}catch(err){

console.log(err);

}

};

window.addEventListener("load",getWeatherData);