import React, { useState } from "react";
import { Redirect } from "react-router-dom";
const SearchBar = ({ props }) => {
  const [search, setSearch] = useState("");
  const [toInvetory, setToInventory] = useState(false);

  const onChange = (e) => setSearch(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    setToInventory(true);
  };
  return toInvetory ? (
    <Redirect to={"/inventory/get/" + search} />
  ) : (
    <nav className="center grey darken-3" style={{ marginTop: "111px" }}>
      <h3>Search your inventory with your steam name or steam ID</h3>

      <i>
        {" "}
        <small>example : 'Lazlow' or ID: 76561198069559601 </small>
      </i>

      <div className="nav-wrapper grey darken-3">
        <form style={{ marginTop: "50px" }} onSubmit={(e) => onSubmit(e)}>
          <div className="input-field #ee6e73">
            <input
              value={search}
              name="search"
              id="search"
              type="search"
              required
              onChange={(e) => onChange(e)}
            />
            <label className="label-icon" htmlFor="search">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default SearchBar;
