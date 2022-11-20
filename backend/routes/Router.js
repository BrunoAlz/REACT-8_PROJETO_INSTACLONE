const express = require("express");
const router = express();

// Importando as Rotas do USER
router.use("/api/users", require("./UserRoutes"));

// Rota de Teste
router.get("/", (req, res) => {
  res.send("API WORKING");
});

module.exports = router;
