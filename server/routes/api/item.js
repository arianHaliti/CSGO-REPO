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
  // console.log(params);
  if (params) {
    if (params.name) {
      match = {
        market_hash_name: { $regex: params.name, $options: "i" },
      };
    }
    if (params.checked) {
      // console.log(params.checked);
    }
    if (params.page) page = parseInt(params.page);
    if (page > 1) skip = limit * (page - 1);
  }
  console.log(params.checked);

  //NEEDS WORK
  let query = [
    {
      $lookup: {
        from: Price.collection.name,
        localField: "_id",
        foreignField: "itemid",
        as: "price_list",
      },
    },
    {
      $lookup: {
        from: Rarity.collection.name,
        localField: "rarity",
        foreignField: "_id",
        as: "rarity_type",
      },
    },
  ];
  if (params.checked) {
    console.log(params.checked);
    let check_category = [];
    for (const [key, value] of Object.entries(JSON.parse(params.checked))) {
      if (value)
        check_category.push(key.charAt(0).toUpperCase() + key.slice(1));
    }

    console.log(check_category);
    query.push({
      $match: {},
    });
    query[2].$match["$and"] = [];
    query[2].$match["$and"].push({
      "rarity_type.rarity": { $in: check_category },
    });
  }
  if (params.name) {
    query[2].$match["$and"].push({
      market_hash_name: { $regex: params.name, $options: "i" },
    });
  }
  let queryCount = query.slice();

  queryCount.push({
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  });
  // console.log(queryCount);
  let count = await Item.aggregate(queryCount);

  count = count[0] ? count[0].count : 0;
  query.push({ $skip: skip });
  query.push({ $limit: limit });

  let items = await Item.aggregate(query);

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
