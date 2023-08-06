import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formValue;
    onRegister(email, password);
  };
  return (
    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__form-input" name="email" type="email" placeholder="Email" onChange={handleChange} value={formValue.email} required />
        <input className="auth__form-input" name="password" type="password" placeholder="Пароль" onChange={handleChange} value={formValue.password} required />
        <button className="auth__submit-btn" type="submit">
          Зарегистрироваться
        </button>
        <div className="auth__signup">
          <p className="auth__signup-text">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="auth__signup-link">
            Войти
          </Link>
        </div>
      </form>
    </section>
  );
}
