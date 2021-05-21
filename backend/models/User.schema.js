const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
/*  _id: {
    type: String,
  },*/
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "beer"
      }
    ],
  }
});

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(expirationDate.getTime() / 1000, 10),
  }, 'secret');
};

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    name: this.name,
    favorites: this.favorites,
    token: UserSchema.methods.generateJWT(),
  };
};

module.exports = mongoose.model('user', UserSchema);
