import "./Auth.css";

// Components
import { Link } from "react-router-dom";
// Hooks
import { useState, useEffect } from "react";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>InstaClone</h2>
      <p className="subtitle">Cadastre-se para ver as fotos dos seus amigos.</p>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Senha" />
        <input type="password" placeholder="Confirme a Senha" />
        <input type="submit" value="Cadastrar" />
      </form>
      <p>
        Já é registrado ? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
};

export default Register;
