import SideBar from "../SideBar/SideBar.jsx"
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css"

function Profile({handleAddClick, onCardClick} ) {
  return(
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar />
      </section>
      <section className="profile__clothes">
        <ClothesSection handleAddClick={handleAddClick} onCardClick={onCardClick}/>
      </section>
    </div>
  );

}

export default (Profile);