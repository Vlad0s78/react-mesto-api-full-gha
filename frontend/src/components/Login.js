import { useState } from "react";

export default function Login({ onLogin }) {
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
    onLogin(email, password);
  };
  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__form-input" name="email" type="email" placeholder="Email" onChange={handleChange} value={formValue.email} required />
        <input className="auth__form-input" name="password" type="password" placeholder="Пароль" onChange={handleChange} value={formValue.password} required />
        <button className="auth__submit-btn" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
