const mongoose = require("mongoose");
const { Schema } = mongoose;

// Criando o SCHEMA de USER, Serve como blueprint para o Model
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    profileImage: String,
    bio: String,
  },
  { timestamps: true }
);

// Criando o model no MongoDB
const User = mongoose.model("User", userSchema);
module.exports = User;
