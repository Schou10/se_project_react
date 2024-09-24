import './Header.css';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.svg";
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, location, username, avatar }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  return (
    <header className='header'>
      <Link to={'/'}>
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date-and-location">{currentDate}, {location}</p>
      <ToggleSwitch/>
      <button className="header__add-clothes-btn" type='button' onClick={handleAddClick}>+ Add clothes</button>
      <Link to={"/profile"} className='header__user-container'>
          <p className="header__username">{username}</p>
          {avatar?
            (<img className="header__avatar" src={avatar} alt="avatar" /> 
            ) : (
            <span className="header__avatar header__avatar_none">
            {username?.toUpperCase().charAt(0) || ""}
            </span>
            )
          }
      </Link>
      
    </header>
  )

}
 
export default Header;