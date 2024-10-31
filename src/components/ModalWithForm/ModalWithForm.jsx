import './ModalWithForm.css'
function ModalWithForm({ children, buttonText, title, isOpen ,onClose, onSubmit,  disable, openLogin, openRegister}){
  return(
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div>
            <button 
          className={`modal__submit ${disable? "modal__submit_disabled": ""}`}
          type='submit'
          disabled={disable}>
          {buttonText}
          </button>
          {title=="Log In" || title=="Sign Up"? (title=="Log In"?(<button type='button' onClick={openRegister} className="modal__button">
          or Sign Up
        </button>
      ) : (
      <button type='button' onClick={openLogin} className="modal__button">
          or Sign In 
        </button>)
        ):("")}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm;