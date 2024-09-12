import './Header.css';
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";

function Header() {
  return (
    <header className='header'>
      <img className="header__logo" src={logo} alt="App Logo" />
      <p className="header__date-and-location">DATE, LOCATION</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
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