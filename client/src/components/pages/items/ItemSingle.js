import React from "react";
import Item from "./Items";

const ItemSingle = ({ item }) => {
  return (
    <div
      className="card row  col s4  #424242 grey darken-3"
      style={{ marginRight: "3px", width: "32.333333%" }}
    >
      <div className="card-content">
        <img
          class="activator"
          style={{ width: "300px", height: "300px" }}
          src={
            "https://steamcommunity-a.akamaihd.net/economy/image/" +
            (item.large_icon ? item.large_icon : item.icon)
          }
        />
      </div>
      <div className="card-tabs ">
        <ul className="tabs tabs-fixed-width  blue-grey darken-4 ">
          <li className="tab">
            <a href="#test4">Test 1</a>
          </li>
          <li className="tab">
            <a className="active" href="#test5">
              Test 2
            </a>
          </li>
          <li className="tab">
            <a href="#test6">Test 3</a>
          </li>
        </ul>
      </div>
      <div className="card-content grey lighten-4 blue-grey darken-4 ">
        <div id="test4">Test 1</div>
        <div id="test5">Test 2</div>
        <div id="test6">Test 3</div>
      </div>
    </div>
  );
};

export default ItemSingle;
