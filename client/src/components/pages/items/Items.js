import React, { useEffect, Fragment } from "react";
import ItemSingle from "./ItemSingle";
import Preloader from "../../layout/Preloader";
import PreloaderCircle from "../../layout/PreloaderCricle";
import PropTypes from "prop-types";
import UpdatePrices from "./ItemOptions/UpdatePrices";
//redux
import { connect } from "react-redux";
import { getItems, updatePrices } from "../../../actions/items";

const Item = ({ getItems, item: { items, loading, invetoryStatus } }) => {
  useEffect(() => {
    getItems();
  }, [getItems]);

  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      {invetoryStatus ? (
        <UpdatePrices
          invetoryStatus={invetoryStatus}
          updatePrices={updatePrices}
        />
      ) : (
        <PreloaderCircle />
      )}
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
  getItems: PropTypes.func.isRequired,
  updatePrices: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
});
export default connect(mapStateToProps, { getItems, updatePrices })(Item);
