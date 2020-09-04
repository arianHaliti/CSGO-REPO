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

// @route   POST inventory/
// @desc    Adds new Items
// @access  Private
router.post("/", async (req, res) => {
  let client = req.body.id;
  let responses = await findClient(client);
  if (responses.status) {
    client = responses.steamid;

    let resData = await axios
      .get(
        `https://steamcommunity.com/inventory/${client}/730/2?l=english&count=5000`
      )
      .catch(function (error) {
        console.log(error, "~ Item Add");
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
      for (const d of desc) {
        // Get Description
        description = d.descriptions[2] ? d.descriptions[2].value : null;

        // Item Model
        let item = {
          icon: d.icon_url,
          large_icon: d.icon_url_large,
          tradable: d.tradable,
          name: d.name,
          name_color: d.name_color,
          market_name: d.market_name,
          market_hash_name: d.market_hash_name,
          description,
          marketable: d.marketable,
        };

        // Check if item exist in DB
        let dbItem = await Item.find({
          market_hash_name: item.market_hash_name,
        });

        if (dbItem.length !== 0) {
          console.log("Item is Already in  DB : ", item.market_hash_name);
          console.log("\x1b[33m%s\x1b[0m", dbItem[0].id);
        } else {
          // Get Rarity
          let rarity = d.tags.filter((cat) => {
            if (cat.category === "Rarity") return cat.category;
          });

          // Get Rarity ID from DB
          let dbRarity = await Rarity.find({
            rarity: rarity[0].localized_tag_name,
          });

          // Get Type ID from DB
          let dbType = await Type.find({ type: d.tags[0].localized_tag_name });

          // Insert ID's in Model
          if (dbRarity.length !== 0) {
            item.rarity = mongoose.Types.ObjectId(dbRarity[0]._id);
          }
          if (dbType.length !== 0) {
            item.type = mongoose.Types.ObjectId(dbType[0]._id);
          }

          // Additional Info
          item.additional = {
            rarity: dbRarity[0].rarity,
            type: d.tags[0].localized_tag_name,
          };

          // Add new item
          let newItem = new Item(item);
          await newItem.save();
          console.log("New Item adde with name : ", item.name);
        }

        items.push(item);
      }
      await updateInventory(client, body);
      let getInventory = await getInventoryItems(client);
      // itemsAdded = items.length;
      // let response = { getInventory };
      res.send(getInventory);
    }
  }
});

// @route   GET /inventory/get
// @desc    Gets Status of inventory update
// @access  Private
router.get("/get/:id", async (req, res) => {
  let client = req.params.id;
  let params = req.query;

  let response = await findClient(client);

  console.log(client, "~~~~ID");
  if (response.status) {
    // client = "76561198139880065";

    let user = await User.findOne({ steamid: client });

    let query = [
      {
        $match: {
          steamid: client,
        },
      },
      { $project: { _id: 0, items: 1 } },
      {
        $limit: 1,
      },
      { $unwind: "$items" },
      {
        $lookup: {
          from: "items", // collection name in db
          localField: "items.itemid",
          foreignField: "_id",
          as: "items_info",
        },
      },
      { $unwind: "$items_info" },
      {
        $lookup: {
          from: "prices", // collection name in db
          localField: "items_info._id",
          foreignField: "itemid",
          as: "price_list",
        },
      },

      {
        $lookup: {
          from: Rarity.collection.name,
          localField: "items_info.rarity",
          foreignField: "_id",
          as: "rarity_type",
        },
      },
    ];

    if (params.checked) {
      let check_category = [];
      for (const [key, value] of Object.entries(JSON.parse(params.checked))) {
        if (value)
          check_category.push(key.charAt(0).toUpperCase() + key.slice(1));
      }

      query.push({
        $match: {},
      });
      query[8].$match["$and"] = [];
      query[8].$match["$and"].push({
        "rarity_type.rarity": { $in: check_category },
      });
    }
    if (params.name) {
      query[8].$match["$and"].push({
        "items.item": { $regex: params.name, $options: "i" },
      });
    }
    console.log(JSON.stringify(query, undefined, 2));
    let items = await Inventory.aggregate(query);

    additional = {
      totalCount: items.length,
      client,
    };

    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total +=
        items[i].items.count *
        (typeof (items[i].price_list.length > 0
          ? items[i].price_list[0].last_price
          : 0) == "undefined"
          ? 0
          : items[i].price_list.length > 0
          ? items[i].price_list[0].last_price
          : 0);
    }
    res.send({ items, additional, total, user });
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
        `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3734978CB10AE3AE9582AD8E2D87081B&vanityurl=${client}`
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
      // console.log("here", 1);
      status = true;
      return { status, steamid };
    }
  } else {
    // Check if its steamid64
    regex = new RegExp("^[0-9]{17}$");
    if (regex.test(client)) {
      // console.log("here", 2);
      status = true;
      steamid = client;
    } else {
      let res = await axios
        .get(
          `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=3734978CB10AE3AE9582AD8E2D87081B&vanityurl=${client}`
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
        // console.log("here", 3);
        status = true;
        return { status, steamid };
      }
    }
  }

  return { status, steamid };
};

const updateInventory = async (client, body) => {
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
    steamid: client,
  };
  let newInvetory = new Inventory(inventory);
  await newInvetory.save();

  //Update User
  let user = await User.findOne({ steamid: client });

  if (user) {
    user.total_request = ++user.total_request;
    user.last_request = Date.now();
    user.update_at = Date.now();

    await user.save();
  } else {
    let userInfo = await axios.get(
      `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=3734978CB10AE3AE9582AD8E2D87081B&steamids=${client}`
    );
    userInfo = userInfo.data.response.players[0];
    let newUser = new User({
      steamid: userInfo.steamid,
      communityvisibilitystate: userInfo.communityvisibilitystate,
      profilestate: userInfo.profilestate,
      personaname: userInfo.personaname,
      commentpermission: userInfo.commentpermission,
      profileurl: userInfo.profileurl,
      avatar: userInfo.avatar,
      avatarmedium: userInfo.avatarmedium,
      avatarfull: userInfo.avatarfull,
      avatarhash: userInfo.avatarhash,
      lastlogoff: userInfo.lastlogoff,
      personastate: userInfo.personastate,
      realname: userInfo.realname,
      primaryclanid: userInfo.primaryclanid,
      timecreated: userInfo.timecreated,
      personastateflags: userInfo.personastateflags,
      loccountrycode: userInfo.loccountrycode,
    });
    await newUser.save();
  }
  let response = { inventory, countItems };
  return response;
};

const getInventoryItems = async (client) => {
  let total = 0;
  let items = await Inventory.aggregate([
    {
      $match: {
        steamid: client,
      },
    },
    { $project: { _id: 0, items: 1 } },
    {
      $limit: 1,
    },
    { $sort: { created_at: -1 } },
    { $unwind: "$items" },
    {
      $lookup: {
        from: "items", // collection name in db
        localField: "items.itemid",
        foreignField: "_id",
        as: "items_info",
      },
    },
    { $unwind: "$items_info" },
    {
      $lookup: {
        from: "prices", // collection name in db
        localField: "items_info._id",
        foreignField: "itemid",
        as: "price_list",
      },
    },

    {
      $lookup: {
        from: "rarities", // collection name in db
        localField: "items_info.rarity",
        foreignField: "_id",
        as: "rarity_type",
      },
    },
  ]);

  additional = {
    totalCount: items.length,
    client,
  };
  for (let i = 0; i < items.length; i++) {
    total +=
      items[i].items.count *
      (typeof (items[i].price_list.length > 0
        ? items[i].price_list[0].last_price
        : 0) == "undefined"
        ? 0
        : items[i].price_list.length > 0
        ? items[i].price_list[0].last_price
        : 0);
  }
  let update = await Inventory.findOne({ steamid: client }).sort({
    created_at: -1,
  });
  update.totalPrice = total;
  await update.save();

  let user = await User.findOne({ steamid: client });
  return { items, additional, total, user };
};
module.exports = router;
