const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  steamid: {
    type: String,
  },
  communityvisibilitystate: {
    type: Number,
  },
  communityvisibilitystate: {
    type: Number,
  },
  personaname: {
    type: String,
  },
  personaname: {
    type: String,
  },
  profileurl: {
    type: String,
  },
  avatar: {
    type: String,
  },
  avatarmedium: {
    type: String,
  },
  steamid: {
    type: String,
  },
  avatarfull: {
    type: String,
  },
  avatarhash: {
    type: String,
  },
  personastate: {
    type: Number,
  },
  realname: {
    type: String,
  },
  primaryclanid: {
    type: String,
  },
  timecreated: {
    type: Date,
  },
  personastateflags: {
    type: Number,
  },
  loccountrycode: {
    type: String,
  },
  locstatecode: {
    type: String,
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
