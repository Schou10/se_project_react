import './ItemCard.css'
function ItemCard({ item }) {
  return(
    <div className='card'>
      <h2 className="card__title">{item.name}</h2>
      <img className="card__img" src={item.link} alt={item.name} />
    </div>
  );
}

export default ItemCard;