import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from '../Profile/Profile.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx';
import Footer from '../Footer/Footer';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { cordinates, APIkey } from '../../utils/constants.js';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext.js';
import { getItems, addItem, deleteItem } from '../../utils/api.js';

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
  const [clothingItems, setClothingItems] = useState([]);


  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("")
    setSelectedCard({})
  };

  const addToClothingItems = (data) => {
    console.log(data, "from addToClothingItems()")
    addItem(data)
    .then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
      closeActiveModal();
    })
    .catch(err => console.error(`Error adding new card: ${err}`));
  };

  const handleDeleteClick= () => {
    setActiveModal("confirm");
  }


  const handleDeleteSubmit= (itemId= selectedCard._id) => {
  
    deleteItem(itemId)
      .then(() =>{
        setClothingItems(clothingItems.filter(item => item._id !== itemId));
        closeActiveModal();
      })
      .catch(err => console.error(`Error deleting item: ${err}`));


  }

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

  useEffect(()=>{
    getItems()
      .then((fetchedItems)=>{
        //set Clothing items
        setClothingItems(fetchedItems);
      })
      .catch(err => console.error(`Error fetching items: ${err}`));

  }, []);




  const username = "Terrence Tegegne";
  const avatar = "";

  return (
      <div className='app'>
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className='app__content'>
          <Header handleAddClick={ handleAddClick } location={weatherData.city} username={username} avatar={avatar}/>
          <Routes>
            <Route path='/' element={<Main weatherData={weatherData} onCardClick={ handleCardClick } clothingItems={clothingItems} /> } />
            <Route path='/profile' element={<Profile  handleAddClick={ handleAddClick } onCardClick={ handleCardClick } username={username} avatar={avatar} clothingItems={clothingItems}/>} />
          </Routes>
          <Footer/>
        </div>
          <AddItemModal activeModal={activeModal} onClose={closeActiveModal} AddItem={addToClothingItems}/>
          <ItemModal item={selectedCard} activeModal={activeModal} onClose={closeActiveModal} onDelete={handleDeleteClick}/>
          <ConfirmModal 
            item={selectedCard} 
            activeModal={activeModal} 
            onClose={closeActiveModal} 
            deleteItem={handleDeleteSubmit}/>
          </CurrentTemperatureUnitContext.Provider>
      </div>
  )
}

export default App;
