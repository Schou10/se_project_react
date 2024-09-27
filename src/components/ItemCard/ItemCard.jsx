import './ItemCard.css'
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  }
  return(
    <li className='card' onClick={handleCardClick}>
      <div className='card__heading'>
        <h2 className="card__title">{item.name}</h2>
        <button className="card__like-btn"></button>
      </div>
      
      <img className="card__img" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;