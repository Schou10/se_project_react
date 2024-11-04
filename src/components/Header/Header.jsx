import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.svg";
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import './Header.css';

function Header({ handleAddClick, handleRegisterClick, handleLoginClick, location }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  const {CurrentUser: user, isLoggedIn} = useContext(CurrentUserContext) || {};
  console.log(user);
  console.log(isLoggedIn);
  return (
    <header className='header'>
      <Link to={'/'}>
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date-and-location">{currentDate}, {location}</p>
      <ToggleSwitch/>
      {isLoggedIn?(<button className="header__add-clothes-btn" type='button' onClick={handleAddClick}>+ Add clothes</button>
      ):(<></>)}
      
      <div className='header__user-container'>
  {isLoggedIn ? (
    // Only apply the Link to the username when logged in
    <Link to="/profile" className="header__username">
      <p className="header__username">{user.name}</p>
    </Link>
  ) : (
    <p className="header__username"></p>
  )}

  {isLoggedIn ? (
    user.avatar ? (
      <img className="header__avatar" src={user.avatar} alt="avatar" />
    ) : (
      <span className="header__avatar header__avatar_none">
        {user.name?.toUpperCase().charAt(0) || ""}
      </span>
    )
  ) : (
    <div>
      <button className="header__register header__button" onClick={handleRegisterClick}>Sign Up</button>
      <button className="header__login header__button" onClick={handleLoginClick}>Login</button>
    </div>
  )}
    </div> 
    </header>
  )
}
 
export default Header;