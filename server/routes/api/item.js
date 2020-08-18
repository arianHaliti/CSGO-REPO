const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Gets Items
// @access  Public
router.get("/items", async (req, res) => {
  let skip = 0;
  let limit = 300;
  let page = 1;
  let params = req.query;
  if (params.name) {
  }
  if (params.order) {
  }
  let items = await Item.find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "price_list", options: { $sort: { "prices.price": 1 } } })
    .populate("rarity_type");

  items.itemperpage = 300;
  items[0].skip = skip;
  items[0].page = page;
  res.send(items);
});
module.exports = router;
