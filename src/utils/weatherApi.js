import { checkResponse } from "./api"; 
export const getWeather = ({latitude, longitude} , APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);

}


export const filterWeatherData = (data) => {
  const result = {};
  result.temp ={ F: `${Math.round(data.main.temp)}°F`, C: `${Math.round((data.main.temp - 32)* 5/9)}°C` };
  result.type = getWeatherType(result.temp);
  result.city = data.name;
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
}

const getWeatherType = (temperature) =>{
  if (temperature >= 86 || temperature >= ((86 - 32)* 5/9)) {
    return 'hot';
  } else if (temperature >= 66 || temperature >= ((66 - 32)* 5/9)) {
    return 'warm';
  } else {
    return 'cold';
  }
}

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};