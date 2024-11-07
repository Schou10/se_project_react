import SideBar from "../SideBar/SideBar.jsx"
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import "./Profile.css"

function Profile({handleAddClick, onCardClick, clothingItems, onChangeProfileClick, onCardLiked} ) {
  return(
    <div className="profile">
      <section className="profile__sidebar">
        <SideBar onChangeProfileClick={onChangeProfileClick}/>
      </section>
      <section className="profile__clothes">
        <ClothesSection 
        handleAddClick={handleAddClick} 
        onCardClick={onCardClick} 
        clothingItems={clothingItems}
        onCardLiked={onCardLiked}/>
      </section>
    </div>
  );

}

export default (Profile);