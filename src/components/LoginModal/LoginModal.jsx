import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function LoginModal({activeModal, onClose}) {
  // User Data
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [disable, setDisable] = useState(true);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      handleDisable()
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(data);
    };

  const handleDisable = (disable) => {
    return (disable? setDisable(false): setDisable(true));

  }

  return(
    <ModalWithForm  isOpen ={activeModal == "sign-in"} title="Change Profile Data" buttonText="Save Changes" onClose={onClose} onSubmit={handleSubmit} disable={disable}>
    <label htmlFor="email" className="modal__label">
        <legend className='modal__legend' >Email*</legend>
        <input 
          type="email" 
          className="modal__input"
          id='email'
          name="email"
          placeholder='Email'
          required
          value={data.email} 
          onChange={handleChange} />
          <span className={""} id="email-input-error"></span>
      </label>
      <label htmlFor="password" className="modal__label"> 
        <legend className="modal_legend" >Password*</legend>
        <input 
          type="password" 
          className="modal__input"
          id='password'
          name="password"
          placeholder='Password'
          required
          value={data.password} 
          onChange={ handleChange} />
          <span className={""} id="password-input-error"></span>
      </label>
    </ModalWithForm>
  )
}

export default LoginModal;