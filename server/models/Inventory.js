const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const InventorySchema = new Schema(
  {
    items: [
      {
        itemid: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Item",
        },
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
        active: {
          type: Boolean,
          // required: true,
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
InventorySchema.virtual("item_list", {
  ref: "items",
  localField: "items.itemid",
  foreignField: "_id",
});
Inventory = mongoose.model("inventories", InventorySchema);

module.exports = Inventory;
