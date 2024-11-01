import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import {setToken, getToken} from '../../utils/token.js';
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from '../Profile/Profile.jsx';
import AddItemModal from '../AddItemModal/AddItemModal.jsx';
import ItemModal from '../ItemModal/ItemModal';
import ConfirmModal from '../ConfirmModal/ConfirmModal.jsx';
import Footer from '../Footer/Footer';
import ChangeProfileModal from '../ChangeProfileModal/ChangeProfileModal.jsx';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx';
import RegisterModal from '../RegisterModal/RegisterModal.jsx';
import LoginModal from '../LoginModal/LoginModal.jsx';
import { getWeather, filterWeatherData } from '../../utils/weatherApi.js';
import { cordinates, APIkey } from '../../utils/constants.js';
import {CurrentTemperatureUnitContext} from '../../contexts/CurrentTemperatureUnitContext.js';
import { getItems, addItem, deleteItem } from '../../utils/api.js';
import AppContext  from '../../contexts/AppContext.js';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import * as auth from '../../utils/auth';
import * as api from "../../utils/api";
import './App.css';

function App() {
  // Constants
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({ name: "", avatar: ""});
  
// Navigate and location set up
  const navigate = useNavigate();
  const location = useLocation();

// Handle Login for signed up users
  const handleLogin = ({name, password}) => {
    if(!name || !password){
      return;
    }
    auth
      .login(name, password)
      .then((data=> {
        if(data.jwt){
          setToken(data.jwt);
          setUserData(data.user);
          setIsLoggeedIn(true);
          const redirectPath = location.state?.from?.pathname || "/";
          navigate(redirectPath);
        }
      }))
      .catch(console.error);
  }
// Handle Registration for new users
  const handleRegistration = ({
    email,
    password,
    name,
    avatar
  }) => {
    if(email){
      auth.register({email, password, name, avatar})
      .then(()=>{
        setActiveModal("sign-in"); // Sends users to the login modal to login to their new account
      })
      .catch(console.error);
    }
  }

  useEffect(()=> {
    const jwt = getToken();
    if(!jwt) {
      return;
    }
    api
    .getUserInfo(jwt)
    .then(({ name, avatar}) =>{
      setIsLoggedIn(true);
      setUserData({name, avatar});
      navigate("/");
    })
    .catch(console.error)
  })
  // Modal Setting Functions
  const handleChangeProfileClick = () => setActiveModal("change-profile"); // Profile Change Data Modal
  const handleAddClick = () => setActiveModal("add-garment"); // Add Item Modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);};    // Item Card Modal
  const handleDeleteClick= () => setActiveModal("confirm"); // Delete Confirm Modal
  const closeActiveModal = () => {
    setActiveModal("")
    setSelectedCard({})};   // Close Modal
  const handleLoginClick =  ()=>setActiveModal("sign-in");
  const handleRegisterClick = ()=>setActiveModal("sign-up");

    // Add Item to cloting Item
  const addToClothingItems = (data) => {
    console.log(data, "from addToClothingItems()")
    addItem(data)
    .then((newItem) => {
      setClothingItems([newItem, ...clothingItems]);
      closeActiveModal();
    })
    .catch(err => console.error(`Error adding new card: ${err}`));
  };

  

// Delete Clothing Item
  const handleDeleteSubmit= (itemId= selectedCard._id) => {
    deleteItem(itemId)
      .then(() =>{
        setClothingItems(clothingItems.filter(item => item._id !== itemId));
        closeActiveModal();
      })
      .catch(err => console.error(`Error deleting item: ${err}`));
  }
// handle Toggle Switch Change 
  const handleToggleSwitchChange = () =>{
    if (currentTemperatureUnit === 'C') setCurrentTemperatureUnit('F');
    if (currentTemperatureUnit === 'F') setCurrentTemperatureUnit('C');
  }

  // Get Weather 
  useEffect(()=>{
    getWeather(cordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error)
  }, []);

  // Get Items
  useEffect(()=>{
    getItems()
      .then((fetchedItems)=>{
        //set Clothing items
        setClothingItems(fetchedItems);
      })
      .catch(err => console.error(`Error fetching items: ${err}`));

  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <AppContext.Provider value = {{isLoggedIn, setIsLoggedIn}}>
      <div className='app'>
        <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit, handleToggleSwitchChange}}>
        <div className='app__content'>
          <Header handleAddClick={ handleAddClick } handleLoginClick={handleLoginClick} handleRegisterClick={handleRegisterClick} location={weatherData.city}/>
          <Routes>
            <Route path='/' element={<Main weatherData={weatherData} onCardClick={ handleCardClick } clothingItems={clothingItems} /> } />
            
              <Route path='/profile' element={
                <ProtectedRoute>
                  <Profile  handleAddClick={ handleAddClick } onCardClick={ handleCardClick } onChangeProfileClick = {handleChangeProfileClick} clothingItems={clothingItems}/>
                </ProtectedRoute>} />
            
            <Route path="*" element = { isLoggedIn ? (
              <Navigate to="/profile" replace />
              ) : (
              <Navigate to="/" replace />
              )
            }
        />
          </Routes>
          <Footer/>
        </div>
          <AddItemModal activeModal={activeModal} onClose={closeActiveModal} addItem={addToClothingItems}/>
          <ItemModal item={selectedCard} activeModal={activeModal} onClose={closeActiveModal} onDelete={handleDeleteClick}/>
          <ConfirmModal 
            item={selectedCard} 
            activeModal={activeModal} 
            onClose={closeActiveModal} 
            deleteItem={handleDeleteSubmit}/>
          <ChangeProfileModal
            activeModal={activeModal}
            onClose={closeActiveModal}
          />
          <LoginModal  handleLogin={handleLogin} 
          activeModal={activeModal} 
          onClose={closeActiveModal}
          handleRegisterClick={handleRegisterClick}/>
          
            
          
        <RegisterModal handleRegistration={handleRegistration}
        activeModal={activeModal} 
        onClose={closeActiveModal}
        handleLoginClick={handleLoginClick}/>
          

          
          
          </CurrentTemperatureUnitContext.Provider>
      </div>
    </AppContext.Provider>
    </CurrentUserContext.Provider>
    
  )
}

export default App;
