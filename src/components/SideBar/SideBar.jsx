import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({onChangeProfileClick}){
  const {user} = useContext(CurrentUserContext)

  function signOut() {
  removeToken();
  navigate("/");
  setIsLoggedIn(false);
  }
  return(
    <section className="sidebar">
      {user.avatar? (
        <img className="sidebar__avatar" src={user.avatar} alt="avatar" /> 
      ) : (
        <span className="sidebar__avatar sidebar__avatar_none">
          {user.name?.toUpperCase().charAt(0) || ""}
        </span>
        )}
        <p className="sidebar__username">{user.name}</p>
        <button className="sidebar__button" onClick={ onChangeProfileClick }>Change Profile Data</button>
        <button className="sidebar__button" onClick= { signOut }>Log Out</button>
      </section>
  );
}

export default SideBar;