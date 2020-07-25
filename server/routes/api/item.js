const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Gets Items
// @access  Public
router.get("/items", async (req, res) => {
  let params = req.query;
  if (params.name) {
  }
  if (params.order) {
  }
  let items = await Item.find({})
    .populate({ path: "price_list", options: { $sort: { "prices.price": 1 } } })
    .populate("rarity_type");
  res.send(items);
});
module.exports = router;
