import './ItemCard.css'
function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  }
  return(
    <li className='card' onClick={handleCardClick}>
      <h2 className="card__title">{item.name}</h2>
      <img className="card__img" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;