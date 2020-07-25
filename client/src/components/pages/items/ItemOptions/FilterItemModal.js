import React, { useState } from "react";

//redux

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../../../actions/items";
const FilterItemModal = ({ getItems }) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");

  const onSubmit = () => {
    let filter = {
      name,
      order,
    };
    console.log("hel");
    getItems(filter);
  };
  return (
    <div id="add-filter-modal" className="modal modal-default">
      <div className="modal-content">
        <h4>Enter filter values</h4>
        <div className="row">
          <div className="input-field">
            <input
              className="modal-default"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="name" className="active">
              Item Name
            </label>
          </div>
        </div>
        <div className="row">
          <div className="input-field ">
            <select
              name="order"
              value={order}
              className="browser-default modal-default"
              onChange={(e) => setOrder(e.target.value)}
            >
              <option value="" disabled>
                Order By
              </option>
              <option value="1">Price</option>
              <option value="2">Quantity</option>
              <option value="3">Alphabet</option>
            </select>
          </div>
        </div>
      </div>
      <div className="modal-footer modal-default">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect wave-green btn-flat modal-default"
        >
          Enter
        </a>
      </div>
    </div>
  );
};
FilterItemModal.propTypes = {
  getItems: PropTypes.func.isRequired,
};
export default connect(null, { getItems })(FilterItemModal);
