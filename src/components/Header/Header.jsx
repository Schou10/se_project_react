import './Header.css';
import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function Header({ handleAddClick, location }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  return (
    <header className='header'>
      <Link to={'/'}>
        <img className="header__logo" src={logo} alt="App Logo" />
      </Link>
      <p className="header__date-and-location">{currentDate}, {location}</p>
      <ToggleSwitch/>
      <button className="header__add-clothes-btn" type='button' onClick={handleAddClick}>+ Add clothes</button>
      <div className="header__user-container">
        <Link to={"/profile"} className='header__username'>
          Terrence Tegegne
        </Link>
        <div className="header__avatar-overlay">
          <img src={avatar} alt="Profile img" className="header__avatar" />
        </div>
      </div>
      
    </header>
  )

}
 
export default Header;