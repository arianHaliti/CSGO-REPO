import React, { useEffect, Fragment } from "react";
import ItemSingle from "../items/ItemSingle";
import Preloader from "../../layout/Preloader";
import PreloaderCircle from "../../layout/PreloaderCricle";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import { getInventory } from "../../../actions/inventory";

const Inventory = ({
  location,
  getInventory,
  inventory: {
    loading,
    inv: { items, totalCount },
  },
}) => {
  useEffect(() => {
    getInventory({ id: location.state.search });
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <div className="row">
        {!loading && items == null ? (
          <p className="center">Could not find player...</p>
        ) : !loading && items.length === 0 ? (
          <p className="center">No items found...</p>
        ) : (
          items.map((item) => (
            <ItemSingle
              items={item.items_info}
              prices={item.price_list}
              rarity={item.rarity_type}
              key={item.items.itemid}
            />
          ))
        )}
      </div>
    </Fragment>
  );
};

Inventory.propTypes = {
  getInventory: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  inventory: state.inventory,
});
export default connect(mapStateToProps, { getInventory })(Inventory);
