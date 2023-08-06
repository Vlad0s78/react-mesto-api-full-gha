import React from "react";
import headerLogo from "../images/header__logo.svg";
import { Routes, Route, Link } from "react-router-dom";

export default function Header(props) {
  return (
    <div>
      <header className="header">
        <img className="header__logo" src={headerLogo} alt="Лого Место" />
        <Routes>
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__link">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <div className="header__user">
                <span className="header__email">{props.email}</span>
                <Link to="/sign-in" className="header__link" onClick={props.onSignOut}>
                  Выйти
                </Link>
              </div>
            }
          />
        </Routes>
      </header>
    </div>
  );
}
