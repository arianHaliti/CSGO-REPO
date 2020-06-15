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
// @desc    Update Invetory
// @access  public
router.post("/update", (req, res) => {});
