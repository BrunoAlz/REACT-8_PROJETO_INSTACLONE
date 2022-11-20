const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

// Inserir foto com usuário relacionado ao Upload
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;

  const reqUser = req.user;

  const user = await User.findById(reqUser._id);

  // Criar a Relação da Foto com o Usuário
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  if (!newPhoto) {
    res
      .status(422)
      .json({ errors: ["Houve um problema, Tente novamente mais tarde"] });
  }
  res.status(201).json(newPhoto);
};

module.exports = {
  insertPhoto,
};
