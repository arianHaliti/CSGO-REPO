import React, { Fragment } from "react";
import { connect } from "react-redux";
import { updateInventory } from "../../../../actions/inventory";

const UpdateInventory = ({ updateInventory, client }) => {
  return (
    <div className=" row  col s4">
      <div className="items-update-prices">
        <Fragment>
          <h6>Update this inventory</h6>
          <button
            className="btn-large waves-effect waves-light  red lighten-1"
            onClick={() => updateInventory({ id: client })}
          >
            <b>
              Update
              <i className="material-icons right">update</i>
            </b>
          </button>
          <br></br>
          <small>
            This might take some time depending on the size of the inventory
          </small>
          <br></br>
        </Fragment>
      </div>
    </div>
  );
};

export default connect(null, { updateInventory })(UpdateInventory);
