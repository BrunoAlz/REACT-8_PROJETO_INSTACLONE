const mongoose = require("mongoose");
const { Schema } = mongoose;

// Criando o SCHEMA de FOTOS, Serve como blueprint para o Model
const PhotoSchema = new Schema(
  {
    image: String,
    title: String,
    likes: Array,
    comments: Array,
    userId: mongoose.ObjectId,
    userName: String,
  },
  { timestamps: true }
);

// Criando o model no MongoDB
const Photo = mongoose.model("Photo", PhotoSchema);
module.exports = Photo;
