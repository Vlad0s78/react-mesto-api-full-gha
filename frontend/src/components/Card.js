import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = `grid-elements__button-like ${isLiked && "grid-elements__button-like_active"}`;

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <article className="grid-elements__items">
      <img className="grid-elements__image" alt={card.name} src={card.link} onClick={handleClick} />
      <div className="grid-elements__info">
        <h2 className="grid-elements__title">{card.name}</h2>
        <div className="grid-elements__like">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="grid-elements__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {isOwn && <button className="grid-elements__button-remove" type="button" onClick={handleDeleteClick}></button>}
    </article>
  );
}
