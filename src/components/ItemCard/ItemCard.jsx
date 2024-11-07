import CurrentUserContext from '../../contexts/CurrentUserContext';
import { useContext } from 'react';
import './ItemCard.css'


function ItemCard({ item, onCardClick, cardLiked }) {
  const { currentUser: user, isLoggedIn} = useContext(CurrentUserContext) || {};
  const handleCardClick = () => onCardClick(item); // Opens the Card Modal
  console.log("ItemCard.jsx", typeof(cardLiked));

  // Check if the item was liked by the current user
  // The likes array should be an array of ids
  
  const isLiked = item.likes.some(id => id === user._id);

  // Create a variable which you then set in `className` for the like button
 
  const itemLikeButtonClassName = `card__like-btn-liked`;
  const handleLike = (e) => {
    cardLiked({id:item._id, isLiked: isLiked});
    e.target.classList.toggle(itemLikeButtonClassName);
  }
  return(
    <li className='card' >
      <div className='card__heading'>
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn? (<button onClick={handleLike}className="card__like-btn"></button>):(<></>)}
        
      </div>
      
      <img className="card__img" src={item.imageUrl} alt={item.name}  onClick={handleCardClick}/>
    </li>
  );
}

export default ItemCard;