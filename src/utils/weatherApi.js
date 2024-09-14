export const getWeather = ({latitude, longitude} , APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then(checkResponse);

}
const checkResponse = (res) =>{
  if (res.ok){
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export const filterWeatherData = (data) => {
  const result = {};
  result.temp ={ F: Math.round(data.main.temp) };
  result.type = getWeatherType(result.temp.F);
  result.city = data.name;
  result.condition = data.weather[0].main.toLowerCase();
  result.isDay = isDay(data.sys, Date.now());
  return result;
}

const getWeatherType = (temperature) =>{
  if (temperature >= 86) {
    return 'hot';
  } else if (temperature >= 66) {
    return 'warm';
  } else {
    return 'cold';
  }
}

const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};