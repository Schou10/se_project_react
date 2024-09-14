import { useState, useEffect } from 'react';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { cordinates, APIkey } from '../../utils/constants.js';

function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "", 
    temp: { F: 999 },
    condition: "",
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({})
  
  const handleAddClick = () => {
    setActiveModal("add garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("")
  };

  useEffect(()=>{
    getWeather(cordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, []);

  return (
    <div className='app'>
        <div className='app__content'>
          <Header handleAddClick={ handleAddClick } location={weatherData.city}/>
          <Main weatherData={weatherData} handleCardClick={ handleCardClick }/>
          <Footer/>
        </div>
        <ModalWithForm title="New garment" buttonText="Add garment"  activeModal={activeModal} onClose={closeActiveModal}>
        <label htmlFor="name" className="modal__label">
            <legend className='modla__legend'>Name</legend>
            <input 
              type="text" 
              className="modal__input"
              name="name"
              placeholder='Name'
              minLength={2}
              maxLength={40}
              required />
          </label>
          <label htmlFor="img" className="modal__label"> 
            <legend className="modal_legend">Image</legend>
            <input 
              type="url" 
              className="modal__input"
              name="img"
              placeholder='Image URL'
              minLength={2}
              maxLength={200}
              required />
          </label>
          <fieldset className='modal__radio-buttons'>
          <legend className="modal__legend"> Select the weather type:</legend>
            <label htmlFor="hot" className='modal__label modal__label_type_radio'>
              <input 
                type="radio" 
                className="modal__radio-input"
                id="hot"
                name="weather-type"
                value="hot"
                required /> Hot
            </label>
            <label htmlFor="warm" className='modal__label modal__label_type_radio'>
              <input 
                type="radio" 
                className="modal__radio-input"
                id="warm"
                name="weather-type"
                value="warm"
                required /> Warm
            </label>
            <label htmlFor="cold" className='modal__label modal__label_type_radio'>
              <input 
                type="radio" 
                className="modal__radio-input"
                id="cold"
                name="weather-type"
                value="cold"
                required /> Cold
            </label>  
          </fieldset>
        </ModalWithForm>
        <ItemModal item={selectedCard} activeModal={activeModal} onClose={closeActiveModal} card={selectedCard}/>
    </div>
  )
}

export default App;
