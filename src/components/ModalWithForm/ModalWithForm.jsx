import './ModalWithForm.css'
function ModalWithForm({ children, buttonText, title, isOpen ,onClose, onSubmit }){
  return(
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
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