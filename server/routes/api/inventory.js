const express = require("express");
const router = express.Router();
const request = require("request");
const _ = require("lodash");
const mongoose = require("mongoose");

const Exterior = require("../../models/Exterior");
const Type = require("../../models/Types");
const Inventory = require("../../models/Inventory");
const User = require("../../models/User");
const Item = require("../../models/Item");
const { response } = require("express");
const e = require("express");
const axios = require("axios");
// @route   POST api/inventory
// @desc    Update Invetory
// @access  public
router.post("/update/:id", async (req, res) => {
  let client = req.params.id;
  let responses = await findClient(client);
  if (responses.status) {
    client = responses.steamid;
    let resData = await axios
      .get(
        `https://steamcommunity.com/inventory/${client}/730/2?l=english&count=5000`
      )
      .catch(function (error) {
        res.send({
          error: "Something went wrong while updating the inventory",
        });
        return;
      });

    if (resData) {
      body = resData.data;
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
      let newInvetory = new Inventory(inventory);
      await newInvetory.save();

      //Update User
      let user = User.findOne({ steam64: steamid });
      if (user) {
        user.total_request = ++user.total_request;
        user.last_request = Date.now();
        user.update_at = Date.now();
        await user.save();
      } else {
        let newUser = new User({
          steam_user: client,
          steam64: steamid,
        });
        await newUser.save();
      }
      let response = { inventory, countItems };
      res.send(response);
    }
  } else {
    res.send({ error: "Something went wrong while updating the inventory" });
  }
});

// @route   GET api/inventory
// @desc    Gets Status of inventory update
// @access  Private
router.get("/get", async (req, res) => {
  let client = req.query.id;
  let response = await findClient(client);

  if (response.status) {
    client = response.steamid;

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
  } else {
    res.send([]);
  }
});

// Local functions
const findClient = async (client) => {
  //Check if its a link of the profile
  let status = false;
  let steamid = null;
  let regex = new RegExp(
    "(?:https?://)?steamcommunity.com/(?:profiles|id)/[a-zA-Z0-9]+$"
  );

  let checkURL = regex.test(client);

  // Check if its a URL
  if (checkURL) {
    client = client.split("/");
    client = client[client.length - 1];
    // Check if client exist with nickname (in steam API)
    let res = await axios
      .get(
        `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=ACB6F2233129562441D854FCD6DAC9FB&vanityurl=${client}`
      )
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
      });
    // Returns 1 if its true
    if (res.data.response.success === 1) {
      steamid = res.data.response.steamid;

      status = true;
      return { status, steamid };
    }
  } else {
    // Check if its steamid64
    regex = new RegExp("^[0-9]{17}$");
    if (regex.test(client)) {
      status = true;
      steamid = client;
    } else {
      let res = await axios
        .get(
          `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=ACB6F2233129562441D854FCD6DAC9FB&vanityurl=${client}`
        )
        .catch(function (error) {
          if (error.response) {
            // Request made and server responded
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
        });
      // Returns 1 if its true
      if (res.data.response.success === 1) {
        steamid = res.data.response.steamid;

        status = true;
        return { status, steamid };
      }
    }
  }

  return { status, steamid };
};
module.exports = router;
