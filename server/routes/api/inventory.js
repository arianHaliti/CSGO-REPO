const express = require("express");
const router = express.Router();
const request = require("request");
const _ = require("lodash");
const mongoose = require("mongoose");

const Exterior = require("../../models/Exterior");
const Type = require("../../models/Types");
const Inventory = require("../../models/Inventory");
const Item = require("../../models/Item");
const { response } = require("express");
const e = require("express");

// @route   POST api/development
// @desc    Update Invetory
// @access  public
router.post("/update", async (req, res) => {
  let body = require("./inv4.json");

  let assets = body.assets;
  let desc = body.descriptions;

  items = [];

  for (const asset of assets) {
    let newItem = desc.find((item) => {
      if (item.classid == asset.classid) {
        return item;
      }
    });
    let exterior = newItem.tags.filter((cat) => {
      if (cat.category === "Exterior") return cat.category;
    });
    let check = items.find((item) => {
      if (item.item == newItem.market_hash_name) {
        return true;
      }

      //   return true;
    });

    if (check) {
      // Increase count of item
      items.find((item) => {
        if (item.item == newItem.market_hash_name) {
          item.count = ++item.count;
        }
      });
    } else {
      // Add new Item in list
      item = {
        item: newItem.market_hash_name,
        count: 1,
      };
      if (exterior.length != 0) item.exterior = exterior[0].localized_tag_name;
      items.push(item);
    }
  }

  countItems = items.length;
  priceSum = 0;
  inventory = {
    items,
    totalCount: countItems,
    totalPrice: 0,
  };
  let newInvetory = new Inventory(inventory);
  await newInvetory.save();

  let response = { inventory, countItems };
  res.send(response);
});

module.exports = router;
