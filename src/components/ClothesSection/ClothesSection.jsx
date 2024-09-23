import "./ClothesSection.css"
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function ClothesSection( {handleAddClick, onCardClick}){
  return(
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__title">
        Your Items
      </p>
      <button className="clothes-section__add-btn" type="button" onClick={handleAddClick}>
        + Add New
      </button>
      </div>
      <ul className="clothes-section__clothes-list">
      {defaultClothingItems.map((item) => {
          return (
            <ItemCard 
              key={item._id} 
              item={item}
              onCardClick={onCardClick}
              />
          )
        })}
      </ul>
    </section>
  );
}

export default ClothesSection;