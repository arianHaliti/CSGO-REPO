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
  console.log(params);
  if (params) {
    if (params.name) {
      match = {
        market_hash_name: { $regex: params.name, $options: "i" },
      };
    }
    if (params.checked) {
      console.log(params.checked);
    }
    if (params.page) page = parseInt(params.page);
    if (page > 1) skip = limit * (page - 1);
  }

  // let items = await Item.find(match)
  //   .skip(skip)
  //   .limit(limit)
  //   .populate({ path: "price_list", options: { $sort: { "prices.price": 1 } } })
  //   .populate("rarity_type");

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
    query.push({
      $match: { "rarity_type.rarity": { $in: ["Classified"] } },
    });
  }
  if (params.name) {
    query.$match = {
      market_hash_name: { $regex: params.name, $options: "i" },
    };
  }
  console.log(query);
  let queryCount = query.slice();

  queryCount.push({
    $group: {
      _id: null,
      count: { $sum: 1 },
    },
  });
  let count = await Item.aggregate(queryCount);

  query.push({ $skip: skip });
  query.push({ $limit: limit });

  let items = await Item.aggregate(query);
  count = count[0].count;

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
