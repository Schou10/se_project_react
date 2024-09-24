import SideBar from "../SideBar/SideBar.jsx"
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css"

function Profile({handleAddClick, onCardClick, username, avatar, clothingItems} ) {
  return(
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar username={username} avatar={avatar}/>
      </section>
      <section className="profile__clothes">
        <ClothesSection handleAddClick={handleAddClick} onCardClick={onCardClick} clothingItems={clothingItems}/>
      </section>
    </div>
  );

}

export default (Profile);