const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Item = require("../../models/Item");

// @route   GET api/items
// @desc    Gets Items
// @access  Public
router.get("/items", async (req, res) => {
  let match = null;
  let skip = 0;
  let limit = 300;
  let page = 1;
  let params = req.query;

  if (params) {
    if (params.name) {
      match = {
        market_hash_name: { $regex: params.name, $options: "i" },
      };
    }
    if (params.page) page = parseInt(params.page);
    if (page > 1) skip = limit * (page - 1);
  }

  let items = await Item.find(match)
    .skip(skip)
    .limit(limit)
    .populate({ path: "price_list", options: { $sort: { "prices.price": 1 } } })
    .populate("rarity_type");
  let count = await Item.find(match).countDocuments();

  additional = {
    itemperpage: limit,
    skip: skip,
    page,
    count,
    params,
  };

  res.send({ items, additional });
});
module.exports = router;
