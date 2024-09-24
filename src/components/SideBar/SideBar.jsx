import avatar from "../../assets/Avatar.svg";
import "./SideBar.css";
function SideBar({username, avatar}){
  return(
    <section className="sidebar">
      {avatar?
        (<img className="sidebar__avatar" src={avatar} alt="avatar" /> 
        ) : (
        <span className="sidebar__avatar sidebar__avatar_none">
        {username?.toUpperCase().charAt(0) || ""}
        </span>
        )
      }
        
        
        <p className="sidebar__username">{username}</p>
      </section>
  );
}

export default SideBar;