import { useState, useEffect } from "react";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { setToken, getToken } from "../../utils/token.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmModal from "../ConfirmModal/ConfirmModal.jsx";
import Footer from "../Footer/Footer";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { getWeather, filterWeatherData } from "../../utils/weatherApi.js";
import { cordinates, APIkey } from "../../utils/constants.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { getItems, addItem, deleteItem } from "../../utils/api.js";
import AppContext from "../../contexts/AppContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import * as auth from "../../utils/auth";
import * as api from "../../utils/api";
import "./App.css";

function App() {
  // Constants
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    condition: "",
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUserData] = useState({
    _id: "",
    name: "",
    avatar: "",
    email: "",
  });

  // Navigate and location set up
  const navigate = useNavigate();
  const location = useLocation();

  // Handle Login for signed up users
  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }
    setIsLoading(true);
    auth
      .login({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          auth
            .getUser(data)
            .then((user) => {
              setUserData(user);
            })
            .finally(() => {
              setIsLoading(false);
              setIsLoggedIn(true);
              navigate("/profile");
              closeActiveModal();
            });
        }
      })
      .catch(console.error);
  };
  // Handle Registration for new users
  const handleRegistration = ({ email, password, name, avatar }) => {
    if (email) {
      setIsLoading(true);
      auth
        .register({ email, password, name, avatar })
        .then(() => setActiveModal("sign in"))
        .catch(console.error)
        .finally(() => setIsLoading(false)); // Sends users to the login modal to login to their new account
    }
  };

  // Modal Setting Functions
  const handleChangeProfileClick = () => setActiveModal("edit-profile"); // Profile Change Data Modal
  const handleAddClick = () => setActiveModal("add-garment"); // Add Item Modal
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  }; // Item Card Modal
  const handleDeleteClick = () => setActiveModal("confirm"); // Delete Confirm Modal
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  }; // Close Modal

  const handleSwitchLogin_SignUp = (e) => {
    if (activeModal == "") {
      setActiveModal(`${e.target.textContent.toLowerCase()}`);
    } else {
      if (activeModal == "sign up") {
        setActiveModal("login");
      } else {
        setActiveModal("sign up");
      }
    }
  };

  // Add Item to cloting Item
  const addToClothingItems = (data) => {
    setIsLoading(true);
    addItem(data)
      .then((newItem) => {
        setClothingItems([newItem, ...clothingItems]);
        closeActiveModal();
      })
      .catch((err) => console.error(`Error adding new card: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Delete Clothing Item
  const handleDeleteSubmit = (itemId = selectedCard._id) => {
    setIsLoading(true);
    deleteItem(itemId)
      .then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== itemId));
        closeActiveModal();
      })
      .catch((err) => console.error(`Error deleting item: ${err}`))
      .finally(() => setIsLoading(false));
  };
  // handle Toggle Switch Change
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  // handle Card Like
  const handleCardLike = ({ id, isLiked }) => {
    const token = getToken();
    // Check if this card is not currently liked
    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };
  // handle Update User info
  const handleUpdateUser = (data) => {
    setIsLoading(true);
    api
      .updateUser(data)
      .then((updatedUser) => {
        setUserData(updatedUser);
        closeActiveModal();
      })
      .catch(() => console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Event Listener
  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      // define the function inside useEffect not to lose the reference on rerendering
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      // don't forget to add a clean up function for removing the listener
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]); // watch activeModal here

  // Get Weather
  useEffect(() => {
    getWeather(cordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  // Get Items
  useEffect(() => {
    getItems()
      .then((fetchedItems) => {
        //set Clothing items
        setClothingItems(fetchedItems);
      })
      .catch((err) => console.error(`Error fetching items: ${err}`));
  }, []);

  // Get User Info from Token
  useEffect(() => {
    const jwt = getToken();
    if (!jwt) {
      return;
    }
    auth
      .getUser({ token: jwt })
      .then((user) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /ducks.
        setIsLoggedIn(true);
        setUserData(user);
        navigate("/profile");
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <AppContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          isLoading,
          setUserData,
        }}
      >
        <div className="app">
          <CurrentTemperatureUnitContext.Provider
            value={{ currentTemperatureUnit, handleToggleSwitchChange }}
          >
            <div className="app__content">
              <Header
                handleAddClick={handleAddClick}
                handleLoginClick={handleSwitchLogin_SignUp}
                handleRegisterClick={handleSwitchLogin_SignUp}
                location={weatherData.city}
              />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Main
                      weatherData={weatherData}
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      onCardLiked={handleCardLike}
                    />
                  }
                />

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile
                        handleAddClick={handleAddClick}
                        onCardClick={handleCardClick}
                        onChangeProfileClick={handleChangeProfileClick}
                        clothingItems={clothingItems}
                        onCardLiked={handleCardLike}
                      />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="*"
                  element={
                    isLoggedIn ? (
                      <Navigate to="/profile" replace />
                    ) : (
                      <Navigate to="/" replace />
                    )
                  }
                />
              </Routes>
              <Footer />
            </div>
            <AddItemModal
              isOpen={activeModal}
              onClose={closeActiveModal}
              addItem={addToClothingItems}
            />
            <ItemModal
              item={selectedCard}
              isOpen={activeModal}
              onClose={closeActiveModal}
              onDelete={handleDeleteClick}
            />
            <ConfirmModal
              item={selectedCard}
              isOpen={activeModal}
              onClose={closeActiveModal}
              deleteItem={handleDeleteSubmit}
            />
            <EditProfileModal
              isOpen={activeModal}
              onClose={closeActiveModal}
              updateUser={handleUpdateUser}
            />
            <LoginModal
              handleLogin={handleLogin}
              isOpen={activeModal}
              onClose={closeActiveModal}
              switchModal={handleSwitchLogin_SignUp}
            />
            <RegisterModal
              handleRegistration={handleRegistration}
              isOpen={activeModal}
              onClose={closeActiveModal}
              switchModal={handleSwitchLogin_SignUp}
            />
          </CurrentTemperatureUnitContext.Provider>
        </div>
      </AppContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
