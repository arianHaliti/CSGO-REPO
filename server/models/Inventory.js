const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema({});
Inventory = mongoose.model("inventories", InventorySchema);

module.exports = Inventory;
