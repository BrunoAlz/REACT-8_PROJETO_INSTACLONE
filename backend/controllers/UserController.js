const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

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

  // Retorna o usuário com o Token
  res.status(201).json({
    _id: newUser._id,
    token: generateToken(newUser._id),
  });
};

// Logar o usuário
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404).json({ erros: ["Usuário não encontrado"] });
    return;
  }

  // Verifica se as senhas do usuários são iguais
  if (!(await bcrypt.compare(password, user.password))) {
    res.status(422).json({ erros: ["Senha Inválida"] });
    return;
  }

  res.status(201).json({
    _id: user._id,
    profileImage: user.profileImage,
    token: generateToken(user._id),
  });
};

// Recupera o usuario logado atualmente
const getCurrentUser = async (req, res) => {
  const user = req.user;

  res.status(200).json(user);
};

// Atualizar dados do Usuário
const update = async (req, res) => {
  const { name, password, bio } = req.body;

  let profileImage = null;

  if (req.file) {
    profileImage = req.file.filename;
  }

  const reqUser = req.user;
  const user = await User.findById(mongoose.Types.ObjectId(reqUser._id)).select(
    "-password"
  );

  if (name) {
    user.name = name;
  }

  if (password) {
    // Encrypta a senha do usuário
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    user.password = passwordHash;
  }

  if (profileImage) {
    user.profileImage = profileImage;
  }

  if (bio) {
    user.bio = bio;
  }

  await user.save();
  res.status(200).json(user);
};

// Recupera o usuário pelo Id
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(mongoose.Types.ObjectId(id)).select(
      "-password"
    );

    if (!user) {
      res.status(404).json({ erros: ["Usuário não encontrado"] });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ erros: ["Usuário não encontrado"] });
    return;
  }
};

module.exports = {
  register,
  login,
  getCurrentUser,
  update,
  getUserById,
};
