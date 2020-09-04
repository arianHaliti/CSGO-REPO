import React, { useState, useEffect } from "react";

//redux

import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getItems } from "../../../../actions/items";
import { getInventory } from "../../../../actions/inventory";
const FilterItemModal = ({ getItems, getInventory }) => {
  const [name, setName] = useState("");
  const [order, setOrder] = useState("");
  // Checkboxes need fix this is a mess
  const [contraband, setContraband] = useState(true);
  const [covert, setCovert] = useState(true);
  const [classified, setClassified] = useState(true);
  const [restricted, setRestricted] = useState(true);
  const [milspec, setMilspec] = useState(true);
  const [industrial, setIndustrial] = useState(true);
  const [consumer, setConsumer] = useState(true);
  //sticker
  const [highgrade, setHighGrade] = useState(true);
  const [remarkable, setRemarkable] = useState(true);
  const [exotic, setExotic] = useState(true);

  //Container \ Sprays
  const [basegrade, setBaseGrade] = useState(true);

  const setContrabandClick = () => setContraband(!contraband);
  const setCovertClick = () => setCovert(!covert);
  const setClassifiedClick = () => setClassified(!classified);
  const setRestrictedClick = () => setRestricted(!restricted);
  const setMilspecClick = () => setMilspec(!milspec);
  const setIndustrialClick = () => setIndustrial(!industrial);
  const setConsumerClick = () => setConsumer(!consumer);
  //sticker
  const setHighGradeClick = () => setHighGrade(!highgrade);
  const setRemarkableClick = () => setRemarkable(!remarkable);
  const setExoticClick = () => setExotic(!exotic);
  //Container \ Sprays
  const setBaseGradeClick = () => setBaseGrade(true);

  const onSubmit = () => {
    let filter = {
      name,
      order,
      checked: {
        contraband: contraband,
        Covert: covert,
        Classified: classified,
        Restricted: restricted,
        "Mil-Spec Grade": milspec,
        "Industrial Grade": industrial,
        "Consumer Grade": consumer,
        //sticker
        "High Grade": highgrade,
        Remarkable: remarkable,
        Exotic: exotic,
        "Base Grade": basegrade,
      },
    };
    let path = window.location.pathname.split("/")[1];
    console.log(window.location.pathname);
    switch (path) {
      case "inventory":
        let id = window.location.pathname.substring(
          window.location.pathname.lastIndexOf("/") + 1
        );
        getInventory({ id: id }, filter);
        break;
      case "items":
        getItems(filter);
        break;
      default:
    }
  };

  useEffect(() => {
    const enterFunction = (event) => {
      if (event.keyCode === 13) {
        document.getElementById("sort-button").click();
      }
    };
    document.addEventListener("keyup", enterFunction, false);

    return () => {
      document.removeEventListener("keyup", enterFunction, false);
    };
  }, []);

  const onClear = () => {
    getItems();
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
        <div className="row">
          <div className="col s4">
            <p>Weapons </p>
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
          <div className="col s4">
            <p>Stickers </p>
            <form action="#">
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={highgrade}
                    onChange={setHighGradeClick}
                  />
                  <span className="amber-text darken-3">High Grade</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={remarkable}
                    onChange={(e) => setRemarkableClick(e.target.value)}
                  />
                  <span className="red-text darken-4">Remarkable</span>
                </label>
              </p>
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={exotic}
                    onChange={(e) => setExoticClick(e.target.value)}
                  />
                  <span className="pink-text darken-3">Exotic</span>
                </label>
              </p>
            </form>
          </div>
          <div className="col s4">
            <p>Container / Graffiti </p>
            <form action="#">
              <p>
                <label>
                  <input
                    type="checkbox"
                    checked={basegrade}
                    onChange={(e) => setBaseGradeClick(e.target.value)}
                  />
                  <span className="blue-lighten-5-text">Base Grade</span>
                </label>
              </p>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-footer modal-default">
        <a
          href="#!"
          onClick={onClear}
          className="modal-close waves-effect wave-green btn-flat modal-default"
        >
          CLEAR
        </a>
        <a
          href="#!"
          onClick={onSubmit}
          className="modal-close waves-effect wave-green btn-flat modal-default"
          id="sort-button"
        >
          SORT
        </a>
      </div>
    </div>
  );
};
FilterItemModal.propTypes = {
  getItems: PropTypes.func.isRequired,
  getInventory: PropTypes.func.isRequired,
};
export default connect(null, { getItems, getInventory })(FilterItemModal);
