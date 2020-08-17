// @route   POST api/development
// @desc    Gets Prices of items
// @access  Private
router.post("/_prices", async (req, res) => {
  let items = await Item.find({ marketable: 1 });
  let time = 500;
  const size = items.length;
  console.log(size, "ETA : " + (size * time) / 1000 + " s");
  // let body = await axios.get(
  //
  // );
  let invetoryState = new InventoryStatus({
    price_update_start_time: new Date(Date.now()),
    price_update_end_time: new Date(Date.now() + size * time),
    price_status: "processing",
    total_items: size,
    timeout_time: time,
  });
  // invetoryState.save();

  let request = await axios.get(
    "http://csgobackpack.net/api/GetItemsList/v2/?currency=EUR&time=7"
  );
  items.forEach((item, index) => {
    try {
      setTimeout(function (time) {
        // Request Steam price API for item

        Price.findOne({ name: item.market_hash_name })
          .then(async (check) => {
            try {
              body = request.data.items_list;
              body_now = body[item.market_hash_name];

              if (!body_now) {
                console.log(
                  "\x1b[31m%s\x1b[0m",
                  "Calling API for items " + item.market_hash_name
                );

                const insert = await axios.get(
                  `http://csgobackpack.net/api/GetItemPrice/?currency=EUR&id=${item.market_hash_name}&time=7&icon=1`
                );
                body_now = {
                  price: {
                    "24_hours": {
                      lowest_price: insert.data.lowest_price,
                      sold: insert.data.amount_sold,
                    },
                  },
                };
              }

              switch (true) {
                case body_now.price.hasOwnProperty("24_hours"):
                  // console.log("24 HOURS");
                  low_price = body_now.price["24_hours"].lowest_price;
                  volume = body_now.price["24_hours"].sold;
                  break;

                case body_now.price.hasOwnProperty("7_days"):
                  // console.log("7 DAYS");
                  low_price = body_now.price["7_days"].lowest_price;
                  volume = body_now.price["7_days"].sold;
                  break;

                case body_now.price.hasOwnProperty("30_days"):
                  // console.log("30 DAYS");
                  low_price = body_now.price["30_days"].average;
                  volume = body_now.price["30_days"].sold;
                  break;

                case body_now.price.hasOwnProperty("all_time"):
                  console.log("ALL TIMES");
                  low_price = body_now.price["all_time"].average;
                  volume = body_now.price["all_time"].sold;
              }

              // Check if its on DB
              if (!check) {
                console.log("\x1b[33m%s\x1b[0m", item.market_hash_name);
                console.log("Added to price history");

                let price = new Price({
                  itemid: mongoose.Types.ObjectId(item._id),
                  name: item.market_hash_name,
                  last_price: low_price,
                  prices: {
                    price: low_price,
                    volume,
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
                console.log("\x1b[32m%s\x1b[0m", `Price saved`);
                console.log(low_price, volume);
                console.log(item.market_hash_name);
                console.log("Added to price history");
                let price = {
                  price: low_price,
                  volume,
                };
                check.last_price = low_price;
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
              console.log(e);
            }
            if (size === index + 1) {
              invetoryState.status = "done";
              invetoryState.save();
            }
          })
          .catch((e) => {
            console.log(e);
          });
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
