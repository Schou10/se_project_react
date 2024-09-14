import './Header.css';
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";

function Header({ handleAddClick, location }) {
  const currentDate = new Date().toLocaleString('default', { month: 'long', day: 'numeric' });
  return (
    <header className='header'>
      <img className="header__logo" src={logo} alt="App Logo" />
      <p className="header__date-and-location">{currentDate}, {location}</p>
      <button className="header__add-clothes-btn" type='button' onClick={handleAddClick}>+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <div className="header__avatar-overlay">
          <img src={avatar} alt="Profile img" className="header__avatar" />
        </div>
      </div>
      
    </header>
  )

}
 
export default Header;