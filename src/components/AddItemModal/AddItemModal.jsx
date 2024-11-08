import "./AddItemModal.css"
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function AddItemModal({isOpen, onClose, addItem}) {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [disable, setDisable] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    handleDisable(e.target.validity.valid);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    handleDisable(e.target.validity.valid);   
  };

  const handleWeatherTypeChange = (e) => {
    setWeather(e.target.value);
    handleDisable(e.target.validity.valid);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({name, imageUrl, weather});
    addItem({name, imageUrl, weather});
  };

  const handleDisable = (disable) => {
    return (disable? setDisable(false): setDisable(true));

  }

  return(
    <ModalWithForm  isOpen ={isOpen == "add-garment"} title="New garment" buttonText="Add garment" onClose={onClose} onSubmit={handleSubmit} disable={disable}>
    <label htmlFor="name" className="modal__label">
        <legend className='modal__legend' >Name</legend>
        <input 
          type="text" 
          className="modal__input"
          id='name'
          name="name"
          placeholder='Name'
          minLength={2}
          maxLength={40}
          required
          value={name} 
          onChange={handleNameChange} />
          <span className={""} id="name-input-error"></span>
      </label>
      <label htmlFor="img" className="modal__label"> 
        <legend className="modal_legend" >Image</legend>
        <input 
          type="url" 
          className="modal__input"
          id='img'
          name="img"
          placeholder='Image URL'
          minLength={2}
          maxLength={200}
          required
          value={imageUrl} 
          onChange={handleUrlChange} />
          <span className={""} id="img-input-error"></span>
      </label>
      <fieldset className='modal__radio-buttons'>
      <legend className="modal__legend"> Select the weather type:</legend>
        <label htmlFor="hot" className='modal__label modal__label_type_radio'>
          <input 
            type="radio" 
            className="modal__radio-input"
            id="hot"
            name="weather-type"
            value="hot"
            required 
            onChange={handleWeatherTypeChange}/> Hot
        </label>
        <label htmlFor="warm" className='modal__label modal__label_type_radio'>
          <input 
            type="radio" 
            className="modal__radio-input"
            id="warm"
            name="weather-type"
            value="warm"
            required 
            onChange={handleWeatherTypeChange} /> Warm
        </label>
        <label htmlFor="cold" className='modal__label modal__label_type_radio'>
          <input 
            type="radio" 
            className="modal__radio-input"
            id="cold"
            name="weather-type"
            value="cold"
            required
            onChange={handleWeatherTypeChange} /> Cold
        </label>
        <span className={""} id="radio-input-error"></span>  
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal;