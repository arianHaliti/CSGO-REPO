import React, { useState } from "react";

//redux

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../../../actions/items";
const FilterItemModal = ({ getItems }) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  // Checkboxes need fix
  const [contraband, setContraband] = useState(true);
  const [covert, setCovert] = useState(true);
  const [classified, setClassified] = useState(true);
  const [restricted, setRestricted] = useState(true);
  const [milspec, setMilspec] = useState(true);
  const [industrial, setIndustrial] = useState(true);
  const [consumer, setConsumer] = useState(true);

  const setContrabandClick = () => setContraband(!contraband);
  const setCovertClick = () => setCovert(!covert);
  const setClassifiedClick = () => setClassified(!classified);
  const setRestrictedClick = () => setRestricted(!restricted);
  const setMilspecClick = () => setMilspec(!milspec);
  const setIndustrialClick = () => setIndustrial(!industrial);
  const setConsumerClick = () => setConsumer(!consumer);

  const onSubmit = () => {
    let filter = {
      name,
      order,
      checked: [
        contraband,
        covert,
        classified,
        restricted,
        milspec,
        industrial,
        consumer,
      ],
    };
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
        <form action="#">
          <p>
            <label>
              <input
                type="checkbox"
                checked={contraband}
                onChange={setContrabandClick}
              />
              <span className="amber-text darken-3">Contraband</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={covert}
                onChange={(e) => setCovertClick(e.target.value)}
              />
              <span className="red-text darken-4">Covert</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={classified}
                onChange={(e) => setClassifiedClick(e.target.value)}
              />
              <span className="pink-text darken-3">Classified</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={restricted}
                onChange={(e) => setRestrictedClick(e.target.value)}
              />
              <span className="purple-text darken-4">Restricted</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={milspec}
                onChange={(e) => setMilspecClick(e.target.value)}
              />
              <span className="blue-text darken-4">Mil-Spec</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={industrial}
                onChange={(e) => setIndustrialClick(e.target.value)}
              />
              <span className="blue-text lighten-3">Industrial Grade</span>
            </label>
          </p>
          <p>
            <label>
              <input
                type="checkbox"
                checked={consumer}
                onChange={(e) => setConsumerClick(e.target.value)}
              />
              <span className="blue-lighten-5-text ">Consumer Grade</span>
            </label>
          </p>
        </form>
      </div>

      <div className="modal-footer modal-default">
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect wave-green btn-flat modal-default"
        >
          SORT
        </a>
      </div>
    </div>
  );
};
FilterItemModal.propTypes = {
  getItems: PropTypes.func.isRequired,
};
export default connect(null, { getItems })(FilterItemModal);
