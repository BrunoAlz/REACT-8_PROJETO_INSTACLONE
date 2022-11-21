const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O Título é Obrigatório.")
      .isString()
      .withMessage("O Título é Obrigatório.")
      .isLength({ min: 10 })
      .withMessage("O Título deve conter no mínimo 10 caracteres."),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A Imagem é Obrigatória.");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O Título é Obrigatório.")
      .isLength({ min: 10 })
      .withMessage("O Título deve conter no mínimo 10 caracteres."),
  ];
};

const photoCommentValidation = () => {
  return [body("comment").isString().withMessage("O Título é Obrigatório.")];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  photoCommentValidation,
};
