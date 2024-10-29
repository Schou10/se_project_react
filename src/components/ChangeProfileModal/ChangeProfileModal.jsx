import "./ChangeProfileModal.css"
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function ChangeProfileModal({activeModal, onClose}) {
  const [userName, setUserName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [disable, setDisable] = useState(true);

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
    handleDisable(e.target.validity.valid);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
    handleDisable(e.target.validity.valid);   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({userName, avatarUrl});
    
  };

  const handleDisable = (disable) => {
    return (disable? setDisable(false): setDisable(true));

  }

  return(
    <ModalWithForm  isOpen ={activeModal == "change-profile"} title="Change Profile Data" buttonText="Save Changes" onClose={onClose} onSubmit={handleSubmit} disable={disable}>
    <label htmlFor="userName" className="modal__label">
        <legend className='modal__legend' >Name *</legend>
        <input 
          type="text" 
          className="modal__input"
          id='userName'
          name="userName"
          placeholder='Name'
          minLength={2}
          maxLength={40}
          required
          value={userName} 
          onChange={handleUserNameChange} />
          <span className={""} id="name-input-error"></span>
      </label>
      <label htmlFor="img" className="modal__label"> 
        <legend className="modal_legend" >Avatar *</legend>
        <input 
          type="url" 
          className="modal__input"
          id='avatarUrl'
          name="img"
          placeholder='Avatar URL'
          minLength={2}
          maxLength={200}
          required
          value={avatarUrl} 
          onChange={handleAvatarUrlChange} />
          <span className={""} id="avatarUrl-input-error"></span>
      </label>
    </ModalWithForm>
  )
}

export default ChangeProfileModal;