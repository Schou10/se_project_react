import "./AddItemModal.css"
import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
function AddItemModal({activeModal, onClose, AddItem}) {
  const [name, setName] = useState("");
  const [link, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeather(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    AddItem({name, link, weather});
  };

  return(
    <ModalWithForm  isOpen ={activeModal == "add-garment"} title="New garment" buttonText="Add garment" onClose={onClose} onSubmit={handleSubmit}>
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
          value={link} 
          onChange={handleUrlChange} />
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
      </fieldset>
    </ModalWithForm>
  )
}

export default AddItemModal;