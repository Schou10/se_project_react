import './ModalWithForm.css'
function ModalWithForm({ children, buttonText, title, activeModal, onClose }){
  return(
    <div className={`modal ${activeModal === "add garment" && 'modal_opened'}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
        <form action="" className="modal__form">
          {children}
          <button 
          className="modal__submit modal__submit_disabled"
          type='submit'>
          {buttonText}
          </button>
        </form>

      </div>
    </div>
  )
}

export default ModalWithForm;