const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

// Conexão com o Banco de Dados MongoDB
const conn = async () => {
  try {
    const dbConn = await mongoose.connect(
      `mongodb+srv://${dbUser}:${dbPassword}@cluster0.ul4mvju.mongodb.net/?retryWrites=true&w=majority`
    );

    console.log("Conectou ao Banco!");
    return dbConn;
  } catch (error) {
    console.log(error);
  }
};

conn();

module.exports = conn;
//
