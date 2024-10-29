import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function RegisterModal({activeModal, onClose}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatarUrl: "",
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({data});
    handleRegistation(data);
    
  };

  // Dissables the Form Submit Button
  const handleDisable = (disable) => {
    return (disable? setDisable(false): setDisable(true));

  }

  return(
    <ModalWithForm  isOpen ={activeModal == "sign-up"} title="Sign Up" buttonText="Sign Up" onClose={onClose} onSubmit={handleSubmit} disable={disable}>
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
    <label htmlFor="userName" className="modal__label">
        <legend className='modal__legend' >Name*</legend>
        <input 
          type="text" 
          className="modal__input"
          id='userName'
          name="userName"
          placeholder='Name'
          minLength={2}
          maxLength={40}
          required
          value={data.name} 
          onChange={handleChange} />
          <span className={""} id="name-input-error"></span>
      </label>
      <label htmlFor="avatar" className="modal__label"> 
        <legend className="modal_legend" >Avatar*</legend>
        <input 
          type="url" 
          className="modal__input"
          id='avatarUrl'
          name="avatar"
          placeholder='Avatar URL'
          minLength={2}
          maxLength={200}
          required
          value={data.avatarUrl} 
          onChange={handleChange} />
          <span className={""} id="avatarUrl-input-error"></span>
      </label>
    </ModalWithForm>
  )
}

export default RegisterModal;