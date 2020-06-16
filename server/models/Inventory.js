const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    items: [
      {
        item: {
          type: String,
        },
        count: {
          type: Number,
        },
        exterior: {
          type: String,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalCount: {
      type: Number,
    },
    totalPrice: {
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
InventorySchema.virtual("item", {
  ref: "items",
  localField: "item",
  foreignField: "_id",
});
InventorySchema.virtual("prices", {
  ref: "price",
  localField: "name",
  foreignField: "name",
});
Inventory = mongoose.model("inventories", InventorySchema);

module.exports = Inventory;
