const express = require("express");
const router = express.Router();
const request = require("request");
const _ = require("lodash");
const mongoose = require("mongoose");

const Exterior = require("../../models/Exterior");
const Type = require("../../models/Types");
const Rarity = require("../../models/Rarity");
const Item = require("../../models/Item");
const { response } = require("express");

// @route   POST api/development
// @desc    Adds Exteriors
// @access  Private
router.post("/_exterior", (req, res) => {
  // Exteriors to be added
  const exteriros = [
    "Battle-Scarred",
    "Factory New",
    "Field-Tested",
    "Minimal Wear",
    "Well-Worn",
    "Not Painted",
  ];
  // count of exteriors to be added
  let i = 0;
  try {
    // Delete all exterios
    Exterior.deleteMany({})
      .then(async () => {
        for (const ext of exteriros) {
          // For each exterior save it
          let newExt = new Exterior({
            exterior: ext,
          });
          await newExt
            .save()
            .then((item) => {
              console.log(item.exterior, "Exterior has been added");
              i++;
            })
            .catch((e) => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total exterior added", i);
        res.send({ message: "success", count: i });
      })
      .catch((e) => {
        console.log(e, "Something went wrong");
        res.status(501).json({ message: "error", count: i });
      });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error", count: 0 });
  }
});

// @route   POST api/development
// @desc    Adds Types
// @access  Private
router.post("/_types", (req, res) => {
  // Types to be added
  const types = [
    "Weapon",
    "Collectible",
    "Container",
    "Gift",
    "Key",
    "Pass",
    "Music Kit",
    "Graffiti",
    "Gloves",
    "Container",
    "Graffiti",
    "Pass",
    "Sniper Rifle",
    "Sticker",
    "Container",
    "Tool",
    "Machinegun",
    "Pistol",
    "Shotgun",
    "Rifle",
    "Collectible",
    "SMG",
    "Container",
  ];
  // count of types to be added
  let i = 0;
  try {
    // Delete all exterios
    Type.deleteMany({})
      .then(async () => {
        for (const t of types) {
          // For each `type` save it
          let newType = new Type({
            type: t,
          });
          await newType
            .save()
            .then((item) => {
              console.log(item.type, "Types has been added");
              i++;
            })
            .catch((e) => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total Types added", i);
        res.send({ message: "success", count: i });
      })
      .catch((e) => {
        console.log(e, "Something went wrong");
        res.status(501).json({ message: "error", count: i });
      });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error", count: 0 });
  }
});

// @route   POST api/development
// @desc    Adds Rarities
// @access  Private
router.post("/_rarities", (req, res) => {
  // Rarities to be added
  const rarities = [
    { rarity: "Covert", rarity_color: "eb4b4b" },
    { rarity: "Mil-Spec Grade", rarity_color: "4b69ff" },
    { rarity: "Restricted", rarity_color: "8847ff" },
    { rarity: "Classified", rarity_color: "d32ce6" },
    { rarity: "Industrial Grade", rarity_color: "5e98d9" },
    { rarity: "Consumer Grade", rarity_color: "b0c3d9" },
    { rarity: "Exotic", rarity_color: "d32ce6" },
    { rarity: "Base Grade", rarity_color: "b0c3d9" },
    { rarity: "High Grade", rarity_color: "4b69ff" },
    { rarity: "Extraordinary", rarity_color: "eb4b4b" },
    { rarity: "Remarkable", rarity_color: "8847ff" },
    { rarity: "Contraband", rarity_color: "e4ae39" },
    { rarity: "Distinguished", rarity_color: "4b69ff" },
    { rarity: "Exceptional", rarity_color: "8847ff" },
    { rarity: "Superior", rarity_color: "d32ce6" },
    { rarity: "Master", rarity_color: "eb4b4b" },
    { rarity: "Stock", rarity_color: "6a6156" },
  ];

  // count of rarities to be added
  let i = 0;
  try {
    // Delete all rarity
    Rarity.deleteMany({})
      .then(async () => {
        for (const r of rarities) {
          // For each `rarity` save it
          let newRarity = new Rarity({
            rarity: r.rarity,
            rarity_color: r.rarity_color,
          });
          await newRarity
            .save()
            .then((item) => {
              console.log(
                item.rarity,
                item.rarity_color,
                "Rarity has been added"
              );
              i++;
            })
            .catch((e) => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total Rarities added", i);
        res.send({ message: "success", count: i });
      })
      .catch((e) => {
        console.log(e, "Something went wrong");
        res.status(501).json({ message: "error", count: i });
      });
  } catch (error) {
    console.error(error);
    res.status(501).json({ message: "error", count: 0 });
  }
});

// @route   POST api/development
// @desc    Adds Rarities
// @access  Private
router.get("/_items", async (req, res) => {
  // request(
  //   "https://steamcommunity.com/inventory/76561198069559601/730/2?l=english&count=5000",
  //   (e, r, body) => {
  //     res.send(body["assets"]);
  //   }
  // );

  let body = require("./inv3.json");

  let assets = body.assets;
  let desc = body.descriptions;
  // res.send(desc[0].name);
  // return;
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
    let dbItem = await Item.find({ name: item.name });

    if (dbItem.length !== 0) {
      console.log("Item is Already in  DB : ", item.name);
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
  itemsAdded = items.length;
  let response = { items, itemsAdded };
  res.send(response);
});

// @route   POST api/development
// @desc    Gets Prices of items
// @access  Private
router.post("/_prices", async (req, res) => {
  let items = await Item.find({});
  let time = 3000;
  const size = items.length;
  console.log(size, "ETA : " + (size * time) / 1000 + " s");

  items.forEach((item, index) => {
    try {
      setTimeout(function (time) {
        // Request Steam price API for item
        request(
          `https://steamcommunity.com/market/priceoverview/?currency=3&appid=730&market_hash_name=${item.market_hash_name}`,
          (e, r, body) => {
            Price.findOne({ name: item.market_hash_name })
              .then((check) => {
                try {
                  body = JSON.parse(body);

                  // Check if its on DB
                  if (!check) {
                    console.log("\x1b[33m%s\x1b[0m", item.market_hash_name);
                    console.log("Added to price history");

                    let price = new Price({
                      itemid: item._id,
                      name: item.market_hash_name,
                      prices: {
                        price: body.lowest_price,
                        volume: body.volume,
                      },
                    });
                    // Add on DB new Price
                    price
                      .save()
                      .then((price) => {
                        console.log(
                          "\x1b[32m%s\x1b[0m",
                          `Price saved for id: ${price.name}`
                        );
                        console.log("-----------------------------------");
                      })
                      .catch((e) => console.log(e));
                  }

                  // Update price history
                  else {
                    let price = {
                      price: body.lowest_price,
                      volume: body.volume,
                    };
                    check.prices.unshift(price);
                    check.save().then((i) => {
                      console.log(item.market_hash_name);
                      console.log(
                        `Price Updated price= ${i.prices[0].price} --- volume = ${i.prices[0].volume}`,
                        " index of  : " + index
                      );
                      console.log("-----------------------------------");
                    });
                  }
                } catch (e) {
                  console.log(
                    "\x1b[31m%s\x1b[0m",
                    `Item does not have Price: ${item.market_hash_name}`
                  );
                }
              })
              .catch((e) => {
                console.log(e);
              });
          }
        );
      }, time * index);
    } catch (e) {
      console.log("Something went wrong");
    }
  });
  res.send({
    time,
    size,
  });
});
module.exports = router;
