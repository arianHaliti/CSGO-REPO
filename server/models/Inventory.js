const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({
  // extirior: {
  //   type: Schema.Types.ObjectId,
  //   ref: "Exterior",
  // },
  // count: {
  //   type: Number,
  // },
  // References
});
Inventory = mongoose.model("inventories", InventorySchema);

module.exports = Inventory;
