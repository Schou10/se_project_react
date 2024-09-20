import './Main.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import { useContext } from 'react';
import { defaultClothingItems } from '../../utils/constants';
import ItemCard from '../ItemCard/ItemCard';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
function Main({ weatherData, handleCardClick }) {
  const {currentTemperatureUnit} = useContext(CurrentTemperatureUnitContext);
  return (
  <main className="main">
    <WeatherCard weatherData={weatherData }/>
    <section className="main__cards">
      <p className="cards__text">
        Today is {currentTemperatureUnit === 'F'? weatherData.temp.F: weatherData.temp.C} / You may want to wear:  
      </p>
      <ul className="cards__list">
        {defaultClothingItems.filter((item)=>{
          return item.weather === weatherData.type;
        }).map((item) => {
          return (
            <ItemCard 
              key={item._id} 
              item={item} 
              onCardClick={handleCardClick}/>
          )
        })}
      </ul>
    </section>
    
  </main>
  )
}
export default Main;