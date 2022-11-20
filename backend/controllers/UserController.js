const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

// Função para gerar o Token - JWT
const generateToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: "7d",
  });
};

// Registrar e Logar o usuário
const register = async (req, res) => {
  res.send("Registro");
};

module.exports = {
  register,
};
