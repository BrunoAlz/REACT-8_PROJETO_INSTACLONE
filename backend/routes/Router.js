const express = require("express");
const router = express();

// Rota de Teste
router.get("/", (req, res) => {
  res.send("API WORKING")
})


module.exports = router;
