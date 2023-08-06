import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({ isOpen, onClose, isLoading, onAddPlace }) {
  const cardNameRef = useRef();
  const cardLinkRef = useRef();

  useEffect(() => {
    if (!isOpen) {
      cardNameRef.current.value = "";
      cardLinkRef.current.value = "";
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: cardNameRef.current.value,
      link: cardLinkRef.current.value,
    });
  }

  return (
    <PopupWithForm 
    name={"add-card"} 
    title={"Новое место"} 
    buttonText={isLoading ? "Сохранение..." : "Создать"} 
    isOpen={isOpen} 
    onClose={onClose} 
    onSubmit={handleSubmit}
    >
      <input 
      className="popup__input popup__input_type_place" 
      type="text" name="name" id="input-place" 
      minLength="2" 
      maxLength="30" 
      placeholder="Название" 
      ref={cardNameRef} 
      required 
      />
      <span className="popup__input-error input-place-error"></span>
      <input 
      className="popup__input popup__input_type_url" 
      type="url" 
      name="link" 
      id="input-url" 
      placeholder="Ссылка на картинку" 
      ref={cardLinkRef} 
      required 
      />
      <span className="popup__input-error input-url-error"></span>
    </PopupWithForm>
  );
}
