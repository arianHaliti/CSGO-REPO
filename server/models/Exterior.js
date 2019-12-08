const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExteriorSchema = new Schema({
  exterior: {
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
Exterior = mongoose.model("exterios", ExteriorSchema);

module.exports = Exterior;
