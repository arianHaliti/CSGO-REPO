import React, { useEffect, Fragment } from "react";
import ItemSingle from "../items/ItemSingle";
import Preloader from "../../layout/Preloader";
import PreloaderCircle from "../../layout/PreloaderCricle";
import PropTypes from "prop-types";
import AddBtnFilter from "../items/ItemOptions/AddBtnFilter";
import UpdateInvetoryBtn from "./InventoryOptions/UpdateInventory";
//redux
import { connect } from "react-redux";
import { getInventory, updateInventory } from "../../../actions/inventory";

const Inventory = ({
  location,
  getInventory,
  inventory: {
    loading,
    inv: { items, totalCount, total, additional, user },
  },
}) => {
  useEffect(() => {
    getInventory({ id: location.state.search });
    // eslint-disable-next-line
  }, []);
  // LOAD BUTTON needs work
  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      {!loading && items != null ? (
        <div className="items-above-section row">
          <UpdateInvetoryBtn
            updateInventory={updateInventory}
            client={additional.client}
          />
          <AddBtnFilter />
        </div>
      ) : (
        <PreloaderCircle />
      )}
      <div className="row">
        {!loading && items == null ? (
          <p className="center">Could not find player...</p>
        ) : !loading && items.length === 0 ? (
          <p className="center">No items found...</p>
        ) : (
          <Fragment>
            <div className="row">
              <div className="col s2 ">
                <a href={user.profileurl} target="_blank">
                  <img className="responsive-img" src={user.avatarfull}></img>
                </a>
              </div>
              <div className="col s10">
                <h5>
                  Owner of Inventory{" "}
                  <span className="red-color-text">{user.personaname}</span>
                </h5>
                <h4>
                  Total Inventory value:{" "}
                  <span className="red-color-text">{total.toFixed(2)}</span>€
                </h4>
              </div>
            </div>

            {items.map((item) => (
              <ItemSingle
                items={item.items_info}
                prices={item.price_list}
                rarity={item.rarity_type}
                additional={item.items}
                key={item.items.itemid}
              />
            ))}
          </Fragment>
        )}
      </div>
    </Fragment>
  );
};

Inventory.propTypes = {
  getInventory: PropTypes.func.isRequired,
  updateInventory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inventory: state.inventory,
});
export default connect(mapStateToProps, { getInventory, updateInventory })(
  Inventory
);
