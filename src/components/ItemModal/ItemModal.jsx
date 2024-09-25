import '../ModalWithForm/ModalWithForm.css'
import './ItemModal.css'

function ItemModal({ item, activeModal, onClose, onDelete }){
  return(
    <div className={`modal ${activeModal ==="preview" && "modal_opened"}`}>
      <div className="modal__container modal__preview">
        <button className="modal__close"  onClick={onClose}></button>
        <img className="modal__img" src={item.imageUrl} alt={item.name} />
        <div className="modal__footer">
          <div className='modal__footer-container'>
            <h2 className="modal__caption">{item.name}</h2>
          <h2 className="modal__weather">Weather: {item.weather}</h2>
          </div>
          <button className="modal__delete-btn" onClick={onDelete}>Delete item</button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;