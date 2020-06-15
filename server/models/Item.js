const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    marketable: {
      type: Number,
      required: true,
    },
    tradable: {
      type: Number,
      required: true,
    },
    large_icon: {
      type: String,
    },
    icon: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    market_hash_name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    rarity: {
      type: Schema.Types.ObjectId,
      ref: "Rarity",
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    additional: {
      rarity: {
        type: String,
      },
      type: {
        type: String,
      },
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
ItemSchema.virtual("prices", {
  ref: "prices",
  localField: "_id",
  foreignField: "itemid",
});
Item = mongoose.model("items", ItemSchema);

module.exports = Item;
