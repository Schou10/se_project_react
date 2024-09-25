import "./ConfirmModal.css"


function ConfirmModal({activeModal, onClose}){
  return(
    <div className={`modal ${activeModal ==="confirm" && "modal_opened"}`}>
      <div className="modal__container modal__confirm">
        <button className="modal__close"  onClick={onClose}></button>
          <h2 className="modal__title">Are you sure you want to delete this item?<br/>
            This action is irreversible.
          </h2>
                 <button className="modal__delete-btn">Yes, delete item</button>
                 <button className="modal__cancel-btn">Cancel</button>
        </div>
      </div>
  );
}

export default ConfirmModal;