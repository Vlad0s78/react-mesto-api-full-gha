import React from "react";

export default function PopupWithForm({ name, title, isOpen, buttonText, onClose, onSubmit, ...props }) {
  return (
    <div className={`popup ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <form className="popup__form popup__form_edit_profile" name={`form-${name}`} onSubmit={onSubmit} noValidate>
          {props.children}
          <button className="popup__btn-submit" type="submit">
            {buttonText}
          </button>
        </form>
        <button className="popup__btn-close" onClick={onClose} type="button"></button>
      </div>
    </div>
  );
}
