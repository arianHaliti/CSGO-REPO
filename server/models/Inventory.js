const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    item: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    count: {
      type: Number,
    },
    created_at: {
      type: Date,
      default: Date.now(),
    },
    update_at: {
      type: Date,
      default: Date.now(),
    },
  },
  { toJSON: { virtuals: true } }
);
ItemSchema.virtual("item", {
  ref: "items",
  localField: "item",
  foreignField: "_id",
});
ItemSchema.virtual("prices", {
  ref: "prices",
  localField: "_id",
  foreignField: "itemid",
});
Inventory = mongoose.model("inventories", InventorySchema);

module.exports = Inventory;
