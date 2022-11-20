const User = require("../models/User");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

const authGuard = async (req, res, next) => {
  // Verifica se o header é de Autorização
  const authHeader = req.headers["authorization"];
  // Quebra o header e pega o token
  const token = authHeader && authHeader.split(" ")[1];
  // Verifica se o Header tem um Token
  if (!token) return res.status(401).json({ errors: ["Acesso negado!"] });
  // Verifica se o Token é válido
  try {
    const verified = jwt.verify(token, jwtSecret);
    // Tenta Recuperar o usuário do Token, sem a Senha
    req.user = await User.findById(verified.id).select("-password");
    // Continua
    next();
  } catch (error) {
    res.status(401).json({ errors: ["Token Inválido!"] });
  }
};

module.exports = authGuard;
