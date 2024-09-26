import './WeatherCard.css';
import { useContext } from 'react';
import { weatherOptions } from '../../utils/constants';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';

function WeatherCard({weatherData}){
  const filteredOptions = weatherOptions.filter((option) =>{
    return option.day === weatherData.isDay &&
     option.condition === weatherData.condition
  });

  const weatherOptionUrl = filteredOptions[0]?.url;
  const weatherOptionCondition = filteredOptions[0]?.condition;
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{currentTemperatureUnit === 'F'? weatherData.temp.F: weatherData.temp.C}</p>
      <img src={weatherOptionUrl} alt={`It is ${weatherOptionCondition}`} className="weather-card__img" />
    </section>
  )
}
export default WeatherCard;