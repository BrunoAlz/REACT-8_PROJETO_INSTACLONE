const { validationResult } = require("express-validator");

const validate = (request, response, next) => {
  //  recupera o erros que vierem na requisição
  const errors = validationResult(request);

  if (errors.isEmpty()) {
    return next();
  }

  // Cria um array vazio para guardar os erros extraidos da requisição
  const extractedErros = [];

  // Se forem recuperados erros da requisição faz o push para o Array
  errors.array().map((err) => extractedErros.push(err.msg));

  return response.status(422).json({
    errors: extractedErros,
  });
};

module.exports = validate;
