import React from "react";

export default function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_image ${card && "popup_opened"}`}>
      <div className="popup__container-image">
        <button className="popup__btn-close popup__btn-close-image" onClick={onClose} type="button"></button>
        <img className="popup__photo" src={card?.link} alt={card?.link} />
        <p className="popup__photo-name">{card?.name}</p>
      </div>
    </div>
  );
}
