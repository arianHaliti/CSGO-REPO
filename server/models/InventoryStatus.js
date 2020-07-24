const mongoose = require("mongoose");
const { Timestamp } = require("mongodb");
const { now } = require("lodash");
const Schema = mongoose.Schema;

const InventoryStatusSchema = new Schema({
  price_update_start_time: {
    type: Date,
    default: Date.now(),
  },
  price_update_end_time: {
    type: Date,
  },
  price_status: {
    type: String,
    required: true,
  },
  total_items: {
    type: Number,
    // required: true,
  },
  timeout_time: {
    type: Number,
    // required: true,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
  update_at: {
    type: Date,
    default: Date.now(),
  },
});

InventoryStatus = mongoose.model("inventory_status", InventoryStatusSchema);

module.exports = InventoryStatus;
