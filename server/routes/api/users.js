const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../../models/User");

// @route   GET api/users
// @desc    Gets users
// @access  Public
router.get("/users", async (req, res) => {
  let params = req.query;

  let users = await User.find();

  res.send(users);
});
module.exports = router;
