const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
  {
    marketable: {
      type: Number,
      required: true
    },
    tradable: {
      type: Number,
      required: true
    },
    large_icon: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    market_hash_name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    count: {
      type: Number
    },
    // References
    rarity: {
      type: Schema.Types.ObjectId,
      ref: "Rarity"
    },
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type"
    },
    extirior: {
      type: Schema.Types.ObjectId,
      ref: "Exterior"
    },

    created_at: {
      type: Date,
      default: Date.now()
    },
    update_at: {
      type: Date,
      default: Date.now()
    }
  },
  { toJSON: { virtuals: true } }
);
ItemSchema.virtual("prices", {
  ref: "prices",
  localField: "_id",
  foreignField: "itemid"
});
Item = mongoose.model("items", ItemSchema);

module.exports = Item;
