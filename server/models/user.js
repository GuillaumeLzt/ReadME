const mongoose = require("mongoose");
const User = mongoose.model(
  "User",
  new mongoose.Schema({

    username: String,
    photoProfil:{type:String,require:false,default:'defaultProfil.png'}, 
    photo:String,
    email: String,
    password: String,
    age: Number,
    ville: String,
    situation: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);
module.exports = User;