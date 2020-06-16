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
  let body = require("./inv3.json");

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
      if (item.name == newItem.name) {
        console.log(item);

        if (item.exterior.length > 0)
          console.log(
            item.exterior[0].localized_tag_name,
            exterior[0].localized_tag_name
          );

        if (
          item.exterior.length > 0 &&
          item.exterior[0].localized_tag_name == exterior[0].localized_tag_name
        ) {
          return true;
        } else if (!item.exterior) {
          return true;
        }
      }

      //   return true;
    });
    // console.log(check);
    // return;

    if (check) {
      //   console.log(check);

      items.find((item) => {
        if (item.name == newItem.name) {
          item.count = ++item.count;
          //   console.log(item);
        }
      });
    } else {
      //   console.log("ADD");
      items.push({
        name: newItem.name,
        count: 1,
        exterior: exterior,
      });
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
  //   await newInvetory.save();

  let response = { items, countItems };
  res.send(response);
});

module.exports = router;
