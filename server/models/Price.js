const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PriceSchema = new Schema({
  itemid: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
  name: {
    type: String,
  },
  prices: [
    {
      price: {
        type: Number,
        deafult: 0.0,
      },
      volume: {
        type: Number,
        deafult: 0,
      },
      date: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
});
Price = mongoose.model("prices", PriceSchema);

module.exports = Price;
