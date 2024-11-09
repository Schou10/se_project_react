import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";

function ItemModal({ item, isOpen, onClose, onDelete }) {
  const { currentUser: user } = useContext(CurrentUserContext) || {};
  const isOwn = item.owner === user._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const itemDeleteButtonClassName = `modal__delete-btn ${
    isOwn ? "modal__delete-button_visible" : "modal__delete-button_hidden"
  }`;
  return (
    <div className={`modal ${isOpen === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__preview">
        <button className="modal__close" onClick={onClose}></button>
        <img className="modal__img" src={item.imageUrl} alt={item.name} />
        <div className={isOwn ? "modal__footer_own" : "modal__footer"}>
          <div className="modal__footer-container">
            <h2 className="modal__caption">{item.name}</h2>
            <h2 className="modal__weather">Weather: {item.weather}</h2>
          </div>
          <button className={itemDeleteButtonClassName} onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
