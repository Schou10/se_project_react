import { weatherOptions } from '../../utils/constants';
import './WeatherCard.css';
function WeatherCard({weatherData}){
  console.log(weatherData.isDay);
  const filteredOptions = weatherOptions.filter((option) =>{
    return option.day === weatherData.isDay &&
     option.condition === weatherData.condition
  });
  console.log(filteredOptions);

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F}&deg;F</p>
      <img src={weatherOptionUrl} alt={`It is ${weatherOptionCondition}`} className="weather-card__img" />
    </section>
  )
}
export default WeatherCard;