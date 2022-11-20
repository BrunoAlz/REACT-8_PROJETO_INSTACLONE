require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// Configuração das Respostas em JSON e Form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configurando os CORS
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

// Configurando o Diretório para o Upload das Imagens
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// Configurando a Conexão com o BD
require("./config/db.js");

// Configurando Rotas
const router = require("./routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`App rodando na porta ${port}`);
});
