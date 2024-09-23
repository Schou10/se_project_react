import avatar from "../../assets/Avatar.svg";
import "./SideBar.css";
function SideBar(){
  return(
    <section className="sidebar">
        <img className="sidebar__avatar" src={avatar} alt="avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </section>
  );
}

export default SideBar;