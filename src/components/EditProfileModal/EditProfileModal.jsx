import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import * as api from "../../utils/api";
import ModalWithForm from "../ModalWithForm/ModalWithForm"
import "./EditProfileModal.css"

function ChangeProfileModal({activeModal, onClose}) {
  const currentUser = useContext(CurrentUserContext) || {};
  const [data, setData] = useState({name: currentUser.name || "", avatar: currentUser.avatar || ""});
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
    console.log(data);
    api.updateUser(data)
    .then(()=> onClose())
    .catch(()=>console.error)
   
  };

  useEffect(() => {
    const isFormValid = Object.values(data).every(value => typeof value === 'string' && value.trim() !== "");
    setDisable(!isFormValid);
  }, [data]);


  return(
    <ModalWithForm  isOpen ={activeModal == "change-profile"} title="Change Profile Data" buttonText="Save Changes" onClose={onClose} onSubmit={handleSubmit} disable={disable}>
    <label htmlFor="change-name" className="modal__label">
        <legend className='modal__legend' >Name *</legend>
        <input 
          type="text" 
          className="modal__input"
          id='change-name'
          name="name"
          placeholder='Name'
          minLength={2}
          maxLength={40}
          required
          value={data.name} 
          onChange={handleChange} />
          <span className={""} id="change-name-input-error"></span>
      </label>
      <label htmlFor="change-avatar" className="modal__label"> 
        <legend className="modal_legend" >Avatar *</legend>
        <input 
          type="url" 
          className="modal__input"
          id='change-avatar'
          name="avatar"
          placeholder='Avatar URL'
          minLength={2}
          maxLength={200}
          required
          value={data.avatar} 
          onChange={handleChange} />
          <span className={""} id="change-avatar-input-error"></span>
      </label>
    </ModalWithForm>
  )
}

export default ChangeProfileModal;