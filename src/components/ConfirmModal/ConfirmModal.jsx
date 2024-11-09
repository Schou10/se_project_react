import { useContext } from "react";
import AppContext from "../../contexts/AppContext";
import "./ConfirmModal.css";

function ConfirmModal({ item, isOpen, onClose, deleteItem }) {
  const { isLoading } = useContext(AppContext);
  return (
    <div className={`modal ${isOpen === "confirm" && "modal_opened"}`}>
      <div className="modal__container modal__confirm">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__title">
          Are you sure you want to delete this item?
          <br />
          This action is irreversible.
        </h2>
        <button
          className="modal__delete-btn"
          onClick={() => deleteItem(item._id)}
        >
          {isLoading ? "Deleting item" : "Yes, Delete Item"}
        </button>
        <button className="modal__cancel-btn" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}

export default ConfirmModal;
