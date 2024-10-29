import { Link } from 'react-router-dom';
import './ModalWithForm.css'
function ModalWithForm({ children, buttonText, title, isOpen ,onClose, onSubmit,  disable}){
  return(
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div className="modal__container">
        <button className="modal__close" onClick={onClose}></button>
        <h2 className="modal__heading">{title}</h2>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <button 
          className={`modal__submit ${disable? "modal__submit_disabled": ""}`}
          type='submit'
          disabled={disable}>
          {buttonText}
          </button>
          {title=="Log In" || title=="Sign Up"? (title=="Log In"?(<Link to="/signup" className="signup__link">
          Sign up here
        </Link>
      ) : (
      <Link to="/signin" className="signup__link">
          Sign in here
        </Link>)
        ):("")}
        </form>
      </div>
    </div>
  )
}

export default ModalWithForm;