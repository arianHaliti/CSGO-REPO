import React, { useState, useEffect, Fragment } from "react";
import ItemSingle from "./ItemSingle";
import Preloader from "../../layout/Preloader";
import axios from "axios";
import PropTypes from "prop-types";

//redux
import { connect } from "react-redux";
import { setAlert } from "../../../actions/alert";

const Item = (props) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  const getItems = async () => {
    setLoading(true);
    const res = await axios.get("/api/items/items");

    setItems(res.data);
    setLoading(false);
  };
  const onUpdatePrices = () => {
    console.log("hello");
    props.setAlert("Updating prices", "danger");
  };
  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <div className="items-above-section row">
        <div className=" row  col s3">
          <div clasName="items-update-prices">
            <h6>Update the item prices</h6>
            <button
              className="btn-large waves-effect waves-light  red lighten-2"
              onClick={onUpdatePrices}
            >
              <b>
                Update
                <i className="material-icons right">update</i>
              </b>
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        {!loading && items.length === 0 ? (
          <p className="center">No items found...</p>
        ) : (
          items.map((item) => <ItemSingle item={item} key={item._id} />)
        )}
      </div>
    </Fragment>
  );
};

Item.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Item);
