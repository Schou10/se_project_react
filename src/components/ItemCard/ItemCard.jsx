import CurrentUserContext from '../../contexts/CurrentUserContext';
import './ItemCard.css'
function ItemCard({ item, onCardClick }) {
  const user = useContext(CurrentUserContext);
  const handleCardClick = () => onCardClick(item); // Opens the Card Modal

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  const isLiked = item.likes.some(id => id === user._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = `card__like-btn-liked`;
  const like = (e) => {
    isLiked.toggleElement(user._id)
    e.classList.toggle(itemLikeButtonClassName)
  }
  return(
    <li className='card' onClick={handleCardClick}>
      <div className='card__heading'>
        <h2 className="card__title">{item.name}</h2>
        <button onClick={like}className="card__like-btn"></button>
      </div>
      
      <img className="card__img" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;