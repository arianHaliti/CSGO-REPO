const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Gets Items
// @access  Public
router.get("/items", async (req, res) => {
  let items = await Item.find({})
    .populate("price_list")
    .populate("rarity_type");
  res.send(items);
});
module.exports = router;