import React from "react";

const ItemSingle = ({ items, prices, rarity }) => {
  const current = prices.length > 0 ? prices[0].prices[0].price : 0.0;
  const before =
    prices.length > 0 && prices[0].prices.length > 1
      ? prices[0].prices[1].price
      : 0.0;

  let diff = 0;
  if (current !== 0 && before !== 0)
    diff = (((current - before) / current) * 100).toFixed(2);

  const diffColor =
    diff == 0 || isNaN(diff) ? "#ffffff" : diff > 0 ? "#00c853 " : "#ff5722 ";
  const diffIcon =
    diff == 0 || isNaN(diff)
      ? "trending_flat"
      : diff > 0
      ? "trending_upf "
      : "trending_down ";
  return (
    <div
      className="card row  col s3  #424242 grey darken-3"
      style={{ marginRight: "3px", width: "24%" }}
    >
      <a
        href={`https://steamcommunity.com/market/listings/730/${items.market_hash_name}`}
        target="_blank"
        style={{
          color: "#" + (rarity.length > 0 ? rarity[0].rarity_color : ""),
        }}
      >
        <div className="card-content center">
          <img
            className="activator"
            alt={items.icon}
            style={{ width: "200px", height: "200px" }}
            src={
              "https://steamcommunity-a.akamaihd.net/economy/image/" +
              (items.large_icon ? items.large_icon : items.icon)
            }
          />
        </div>
        <div className="center truncate #ee6e73">
          <strong>{items.name}</strong>
        </div>
      </a>
      <div className="card-tabs ">
        <ul className="tabs tabs-fixed-width  blue-grey darken-4 ">
          <li className="tab">
            <a href="#test4">Quantity</a>
          </li>
          <li className="tab">
            <a className="active" href="#test5">
              Price
            </a>
          </li>
          <li className="tab">
            <a href="#test6">Info</a>
          </li>
        </ul>
      </div>
      <div className="card-content grey lighten-4 blue-grey darken-4  center">
        <div id="test4">
          Current Price:{" "}
          <span style={{ color: "#b3e5fc", fontSize: 24 }}>
            {" " + current + " €"}
          </span>
        </div>
        <div
          id="test5"
          style={{ fontSize: 24, marginLeft: 42, color: diffColor }}
          className="center"
        >
          {diff + " %"}
          <span className=" material-icons">{diffIcon}</span>
        </div>
        <div id="test6">
          Before Price:{" "}
          <span style={{ color: "#ffccbc", fontSize: 24 }}>
            {" " + before + " €"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ItemSingle;
