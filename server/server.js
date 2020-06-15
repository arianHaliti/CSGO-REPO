require("./config/config.js");
require("./database/db");
const express = require("express");

const app = express();

const Item = require("./models/Item");
const Price = require("./models/Price");

// Init Middleware
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  Price.find({}).then((i) => {
    res.send(i);
  });
});

app.use("/api/development", require("./routes/api/development"));
app.use("/api/inventory", require("./routes/api/inventory"));

// app.use("/api/auth", require("./routes/api/auth"));
// app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;
app.listen(process.env.PORT, process.env.IP, () =>
  console.log(`Server started at port: ${PORT}`)
);
