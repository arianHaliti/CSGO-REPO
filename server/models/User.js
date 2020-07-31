const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  steam_user: {
    type: String,
    required: true,
  },
  steam64: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
  last_request: {
    type: Date,
    default: Date.now(),
  },
  total_request: {
    type: Number,
    default: 1,
  },
});

User = mongoose.model("users", UserSchema);

module.exports = User;
