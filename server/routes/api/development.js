const express = require("express");
const router = express.Router();

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
        //   exteriros.forEach(async ext => {
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

module.exports = router;
