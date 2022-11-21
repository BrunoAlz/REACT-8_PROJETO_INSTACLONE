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
    return;
  }
  res.status(201).json(newPhoto);
};

// Deleta a foto do DB
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;
  try {
    const photo = await Photo.findById(mongoose.Types.ObjectId(id));
    if (!photo) {
      res.status(404).json({ errors: ["Foto não encontrada!"] });
      return;
    }
    if (!photo.userId.equals(reqUser._id)) {
      res.status(422).json({
        errors: [
          "Ocorreu um erro ao tentar deletar esta foto, tente novamente mais tarde.",
        ],
      });
      return;
    }

    await Photo.findByIdAndDelete(photo._id);
    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  } catch (error) {
    res.status(404).json({
      errors: [
        "Não foi possível executar a exclusão, tente novamente mais tarde!",
      ],
    });
    return;
  }
};

module.exports = {
  insertPhoto,
  deletePhoto,
};
