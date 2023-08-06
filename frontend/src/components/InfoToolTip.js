import SuccessIcon from "../images/successicon.svg";
import ErrorIcon from "../images/erroricon.svg";

export default function InfoToolTip({ isOpen, isSuccess, onClose }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        {isSuccess ? (
          <>
            <img src={`${SuccessIcon}`} className="popup__tooltip-icon" alt="Вы успешно зарегистрировались!" />
            <p className="popup__tooltip-text">Вы успешно зарегистрировались!</p>
          </>
        ) : (
          <>
            <img src={`${ErrorIcon}`} className="popup__tooltip-icon" alt="Не удалось зарегистрироваться." />
            <p className="popup__tooltip-text">Что-то пошло не так! Попробуйте ещё раз.</p>
          </>
        )}
        <button onClick={onClose} type="button" className="popup__btn-close" />
      </div>
    </div>
  );
}
