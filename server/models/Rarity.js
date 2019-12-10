const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RaritySchema = new Schema({
  rarity: {
    type: String,
    required: true
  },
  rarity_color: {
    type: String,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  update_at: {
    type: Date,
    default: Date.now()
  }
});

Rarity = mongoose.model("rarities", RaritySchema);

module.exports = Rarity;
