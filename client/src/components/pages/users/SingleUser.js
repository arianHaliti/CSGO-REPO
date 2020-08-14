import React from "react";
import { Link } from "react-router-dom";

function SingleUser({ user }) {
  return (
    <div
      className="col s2 card  #424242 grey darken-3"
      style={{ marginRight: "10px" }}
    >
      <Link
        to={{ pathname: "/inventory/get", state: { search: user.steamid } }}
      >
        <img className="responsive-img" src={user.avatarfull}></img>
      </Link>

      <h5>
        <span className="red-color-text">{user.personaname}</span>
      </h5>
      <h5>
        Total requests{" "}
        <span className="red-color-text">{user.total_request}</span>
      </h5>
    </div>
  );
}

export default SingleUser;
