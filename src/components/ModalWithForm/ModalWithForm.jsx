import './ModalWithForm.css'
function ModalWithForm(){
  return(
    <div className="modal">
      <div className="modal__container">
        <button className="modal__close"></button>
        <h2 className="modal__heading">New garment</h2>
        <form action="" className="modal__form">
          <label htmlFor="" className="modal__label" for="name">
            <legend className='modla__legend'>Name</legend>
            <input 
              type="text" 
              className="modal__input"
              name="name"
              placeholder='Name'
              minLength={2}
              maxLength={40}
              required />
          </label>
          <label htmlFor="" className="modal__label" for="img"> 
            <legend className="modal_legend">Image</legend>
            <input 
              type="url" 
              className="modal__input"
              name="img"
              placeholder='Image URL'
              minLength={2}
              maxLength={200}
              required />
          </label>
          <label htmlFor="" className="modal__label"> Select the weather type:
            <input 
              type="radio" 
              className="modal__input"
              id="hot"
              name="weather-type"
              value="hot"
              required />
              <label htmlFor="hot" className='modal__label'>Hot</label>
            <input 
              type="radio" 
              className="modal__input"
              id="warm"
              name="weather-type"
              value="warm"
              required />
              <label htmlFor="warm" className='modal__label'>Warm</label>
            <input 
              type="radio" 
              className="modal__input"
              id="cold"
              name="weather-type"
              value="cold"
              required />
              <label htmlFor="cold" className='modal__label'>Cold</label>
            
          </label>
        </form>

      </div>
    </div>
  )
}

export default ModalWithForm;