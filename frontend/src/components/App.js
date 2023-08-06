import { useState, useEffect } from "react";
// import Cookies from 'js-cookie';
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import { Routes, Route, useNavigate } from "react-router-dom";
import * as auth from "../utils/Auth.js";
import Register from "./Register.js";
import Login from "./Login.js";
import InfoToolTip from "./InfoToolTip.js";

export default function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [InfoToolTipPopupOpen, setInfoToolTipPopupOpen] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      api
      .getUserInfo()
      .then((userInfo) => setCurrentUser(userInfo))
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      api
      .getInitialCards()
      .then((cards) => setCards(cards.reverse()))
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    handleTokenCheck();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTokenCheck() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.checkToken(jwt)
      .then((user) => {
        setEmail(user.email);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
      });
    }
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        console.log(newCard);
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCardFromServer(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .updateUserInfo(data)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .updateAvatar(data)
      .then((item) => {
        setCurrentUser(item);
        closeAllPopups();
      })
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(`ОшибОЧКА ДРУГАЛЁЧЕК: ${err}`))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setSelectedCard(null);
    setInfoToolTipPopupOpen(false);
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoToolTipPopupOpen(true);
        setIsSuccess(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - Некорректено заполнено одно из полей");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .login(email, password)
      .then(() => {
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
    })
      .catch((err) => {
        if (err.status === 400) {
          console.log("400 - Не передано одно из полей");
        } else if (err.status === 401) {
          console.log("401 - Пользователь с Email не найден");
        }
        setInfoToolTipPopupOpen(true);
        setIsSuccess(false);
      });
  }


  function handleSignout() {
    auth
    .logout()
      .then((res) => {
        if (res.exit) {
          setIsLoggedIn(false);
          navigate("/sign-in");
          document.cookie = "jwtChek=; expires=Mon, 25 Oct 1917 00:00:01 GMT;";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header onSignOut={handleSignout} isLoggedIn={isLoggedIn} email={email} />
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  loggedIn={isLoggedIn}
                  element={Main}
                />
              }
            />
            <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
            <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          </Routes>

          {isLoggedIn && <Footer />}

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} isLoading={isLoading} />
          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} isLoading={isLoading} />
          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} isLoading={isLoading} />

          <PopupWithForm name={"delete-card"} title={"Вы уверены?"} onClose={closeAllPopups} />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <InfoToolTip name="infotooltip" isOpen={InfoToolTipPopupOpen} isSuccess={isSuccess} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}
