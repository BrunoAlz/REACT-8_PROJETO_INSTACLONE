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
  const { name, email, password } = req.body;

  // Verifica se o usuário já existe
  const user = await User.findOne({ email });

  if (user) {
    res.status(442).json({ erros: ["Por favor, utilize outro E-mail"] });
    return;
  }

  // Encrypta a senha do usuário
  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  // Cria o usuário no Banco
  const newUser = await User.create({
    name,
    email,
    password: passwordHash,
  });

  // Verifica se o usuário foi criado com sucesso, e retorna o Token
  if (!newUser) {
    res
      .status(422)
      .json({ erros: ["Houve um erro, por favor tente mais tarde."] });
    return;
  }

  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

module.exports = {
  register,
};
