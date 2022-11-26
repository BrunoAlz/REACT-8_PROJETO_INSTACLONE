const { body } = require("express-validator");

const userCreateValidation = () => {
  return [
    body("name")
      .isString()
      .withMessage("O Nome é Obrigatório.")
      .isLength({ min: 5 })
      .withMessage("O Nome deve possuir no mínimo 5 caracteres"),
    body("email")
      .isString()
      .withMessage("O Email é Obrigatório.")
      .isEmail()
      .withMessage("Insira um Email válido."),
    body("password")
      .isString()
      .withMessage("A Senha é Obrigatória")
      .isLength({ min: 8 })
      .withMessage("A Senha deve possuir no mínimo 8 caracteres"),
    body("confirmPassword")
      .isString()
      .withMessage("A confirmação de Senha é Obrigatória")
      // Recebe um valor e compara com o password da requisição, se for igual volta true, se lança o erro
      .custom((value, { req }) => {
        if (value != req.body.password) {
          throw new Error("As senhas não são iguais.");
        }
        return true;
      }),
  ];
};

const userLoginValidation = () => {
  return [
    body("email")
      .isString()
      .withMessage("O E-mail é Obrigatório")
      .isEmail()
      .withMessage("Insira um E-mail válido."),
    body("password").isString().withMessage("A Senha é Obrigatória"),
  ];
};

const userUpdateValidation = () => {
  return [
    body("name")
      .optional()
      .isLength({ min: 5 })
      .withMessage("O Nome deve possuir no mínimo 5 caracteres"),
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("A Senha deve possuir no mínimo 8 caracteres"),
  ];
};

module.exports = {
  userCreateValidation,
  userLoginValidation,
  userUpdateValidation,
};
