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

// @route   POST api/inventory
// @desc    Update Invetory
// @access  public
router.post("/update/:id", async (req, res) => {
  // let body = require("./inv3.json");
  let client = req.params.id;

  request(
    "https://steamcommunity.com/inventory/76561198005755459/730/2?l=english&count=5000",
    async (e, r, body) => {
      body = JSON.parse(body);
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
        let dbItem = await Item.findOne({
          market_hash_name: newItem.market_hash_name,
        });
        if (check) {
          // Increase count of item
          items.find((item) => {
            if (item.item == newItem.market_hash_name) {
              console.log(
                "\x1b[33m%s\x1b[0m",
                `Counting item ${newItem.market_hash_name} ++ ~ ${item.count}`
              );

              item.count = ++item.count;
            }
          });
        } else {
          // Add new Item in list
          // res.send(newItem.market_hash_name);
          console.log(`Adding item ${newItem.market_hash_name}`);
          item = {
            itemid: dbItem._id,
            item: newItem.market_hash_name,
            count: 1,
          };
          if (exterior.length != 0)
            item.exterior = exterior[0].localized_tag_name;

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
      let oldInventory = Inventory.findOne({ steamid: {} });
      let newInvetory = new Inventory(inventory);
      await newInvetory.save();

      let response = { inventory, countItems };
      res.send(response);
    }
  );
});

// @route   GET api/inventory
// @desc    Gets Status of inventory update
// @access  Private
router.get("/get/:id", async (req, res) => {
  //WORK HERE
  let client = req.params.id;

  console.log(client);
  let items = await Inventory.findOne({ steamid: client })
    .populate("item_list")
    .populate({
      path: "item_list",
      populate: { path: "price_list", model: "prices" },
    })
    .populate({
      path: "item_list",
      populate: { path: "rarity_type", model: "rarities" },
    });
  items.items = null;
  res.send(items);
});

module.exports = router;
