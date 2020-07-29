import React, { useEffect, Fragment } from "react";
import ItemSingle from "../items/ItemSingle";
import Preloader from "../../layout/Preloader";
import PreloaderCircle from "../../layout/PreloaderCricle";
import PropTypes from "prop-types";
//redux
import { connect } from "react-redux";
import { getInventory } from "../../../actions/inventory";

const Inventory = ({
  getInventory,
  inventory: {
    loading,
    inv: { item_list, totalCount },
  },
}) => {
  useEffect(() => {
    getInventory();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      <div className="row">
        {!loading && item_list.length === 0 ? (
          <p className="center">No items found...</p>
        ) : (
          item_list.map((item) => <ItemSingle item={item} key={item._id} />)
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
