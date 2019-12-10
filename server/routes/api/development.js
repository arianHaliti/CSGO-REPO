const express = require("express");
const router = express.Router();
const request = require("request");
const _ = require("lodash");

const Exterior = require("../../models/Exterior");
const Type = require("../../models/Types");
const Rarity = require("../../models/Rarity");
const Item = require("../../models/Item");

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
    "Not Painted"
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
            exterior: ext
          });
          await newExt
            .save()
            .then(item => {
              console.log(item.exterior, "Exterior has been added");
              i++;
            })
            .catch(e => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total exterior added", i);
        res.send({ message: "success", count: i });
      })
      .catch(e => {
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
    "Gloves"
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
            type: t
          });
          await newType
            .save()
            .then(item => {
              console.log(item.type, "Types has been added");
              i++;
            })
            .catch(e => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total Types added", i);
        res.send({ message: "success", count: i });
      })
      .catch(e => {
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
    { rarity: "Contraband", rarity_color: "e4ae39" }
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
            rarity_color: r.rarity_color
          });
          await newRarity
            .save()
            .then(item => {
              console.log(
                item.rarity,
                item.rarity_color,
                "Rarity has been added"
              );
              i++;
            })
            .catch(e => {
              console.log(e, "Something went wrong");
              res.send({ message: "error", count: i });
            });
        }
        console.log("Total Rarities added", i);
        res.send({ message: "success", count: i });
      })
      .catch(e => {
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
router.get("/_items", (req, res) => {
  // request(
  //   "https://steamcommunity.com/inventory/76561198069559601/730/2?l=english&count=5000",
  //   (e, r, body) => {
  //     res.send(body["assets"]);
  //   }
  // );

  let body = require("./inv.json");

  let assets = body.assets;
  let desc = body.descriptions;

  items = [];
  for (const d of desc) {
    rarity = _.find(d.tags, { category: "Rarity" });
    res.send(rarity);
    return;
    let newItem = new Item({
      marketable: d.marketable,
      tradable: d.tradable,
      large_icon: d.icon_url_large,
      icon: d.icon_url,
      name: d.name,
      market_hash_name: d.market_hash_name,
      description: descriptions[0].value
    });
  }
  res.send(items.length);
});

module.exports = router;
