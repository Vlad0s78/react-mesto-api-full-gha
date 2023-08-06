import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, isLoading, ...props }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm 
    name={"edit-profile"} 
    title={"Редактировать профиль"} 
    buttonText={isLoading ? "Сохранение..." : "Сохранить"} 
    isOpen={isOpen} 
    onClose={onClose} o
    onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_name"
        type="text"
        name="name"
        id="input-name"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        value={name || ""}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <span className="popup__input-error input-name-error"></span>
      <input
        className="popup__input popup__input_type_description"
        type="text"
        name="about"
        id="input-description"
        minLength="2"
        maxLength="200"
        placeholder="О себе"
        value={description || ""}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <span className="popup__input-error input-description-error"></span>
    </PopupWithForm>
  );
}
