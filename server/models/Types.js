const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  type: {
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
Type = mongoose.model("types", TypeSchema);

module.exports = Type;
