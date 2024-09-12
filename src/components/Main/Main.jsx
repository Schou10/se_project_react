import './Main.css'
import WeatherCard from '../WeatherCard/WeatherCard';
import { defaultClothingItems } from '../../utils/constants';
function Main() {
  return (
  <main className="main">
    <WeatherCard/>
    <section className="cards">
      <p className="cards__text">Today is 75 &deg; F / You may want to wear  </p>
      <ul className="cards__list">
        {defaultClothingItems.map((item) => {
          return (
            <div key={item._id}>
              <h2 className="card__name">{item.name}</h2>
              <img className="card__img" src={item.link} alt={item.name} />
            </div>
          )
        })}
      </ul>
    </section>
    
  </main>
  )
}
export default Main;