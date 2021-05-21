const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
  _id: { type: String,},
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  beerId: { type: mongoose.Schema.Types.ObjectId, ref: "beer", required: true },
  score: { type: Number, required: true },
});

module.exports = mongoose.model('score', ScoreSchema);
