import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { cordinates, APIkey } from '../../utils/constants.js';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext.js';

function App() {
  const [weatherData, setWeatherData] = useState({ 
    type: "", 
    temp: { F: 999 },
    condition: "",
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState('F');
  
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("")
  };

  const addItem = (values) => {
    console.log(values);
    closeActiveModal();
  };

  const handleToggleSwitchChange = () =>{
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
  }

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
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className='app__content'>
          <Header handleAddClick={ handleAddClick } location={weatherData.city}/>
          <Routes>
            <Route path='./' element={<Main weatherData={weatherData} handleCardClick={ handleCardClick } /> } />
            <Route path='./profile' element={<p>Profile</p>} />
          </Routes>
          <Footer/>
        </div>
          <AddItemModal activeModal={activeModal} onClose={closeActiveModal} AddItem={addItem}/>
          <ItemModal item={selectedCard} activeModal={activeModal} onClose={closeActiveModal} card={selectedCard}/>
          </CurrentTemperatureUnitContext.Provider>
      </div>
  )
}

export default App;
