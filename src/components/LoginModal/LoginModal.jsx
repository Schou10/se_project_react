import React, { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function LoginModal({handleLogin ,activeModal, onClose, handleRegisterClick}) {
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
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      handleLogin(data);
      onClose();
    };

    useEffect(() => {
      const isFormValid = Object.values(data).every((value) => value.trim() !== "");
      setDisable(!isFormValid);
    }, [data]);
  

  return(
    <ModalWithForm  isOpen ={activeModal == "sign-in"} title="Log In" buttonText="Log In" onClose={onClose} onSubmit={handleSubmit} disable={disable} openRegister={handleRegisterClick}>
    <label htmlFor="signin-email" className="modal__label">
        <legend className='modal__legend' >Email*</legend>
        <input 
          type="email" 
          className="modal__input"
          id='signin-email'
          name="email"
          placeholder='Email'
          required
          value={data.email} 
          onChange={handleChange} />
          <span className={""} id="signin-email-input-error"></span>
      </label>
      <label htmlFor="signin-password" className="modal__label"> 
        <legend className="modal_legend" >Password*</legend>
        <input 
          type="password" 
          className="modal__input"
          id='signin-password'
          name="password"
          placeholder='Password'
          required
          value={data.password} 
          onChange={ handleChange}
          minLength={2}
          maxLength={40} />
          <span className={""} id="signin-password-input-error"></span>
      </label>
    </ModalWithForm>
  )
}

export default LoginModal;