import React, { useEffect, Fragment } from "react";
import ItemSingle from "./ItemSingle";
import Preloader from "../../layout/Preloader";
import PreloaderCircle from "../../layout/PreloaderCricle";
import PropTypes from "prop-types";
import UpdatePrices from "./ItemOptions/UpdatePrices";
import AddBtnFilter from "./ItemOptions/AddBtnFilter";
import Pagination from "../../layout/Pagination";
//redux
import { connect } from "react-redux";
import { getItems, updatePrices } from "../../../actions/items";

const Item = ({
  getItems,
  item: {
    items: { items, additional },
    loading,
    invetoryStatus,
  },
}) => {
  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <Preloader />;
  }
  return (
    <Fragment>
      {invetoryStatus ? (
        <div className="items-above-section row">
          <UpdatePrices
            invetoryStatus={invetoryStatus}
            updatePrices={updatePrices}
          />
          <AddBtnFilter />
        </div>
      ) : (
        <PreloaderCircle />
      )}

      {!loading && items.length === 0 ? (
        <div>
          <p className="center">No items found...</p>
          <a href="#!">
            <i
              onClick={() => getItems()}
              className="material-icons large center-align"
              style={{ display: "block" }}
            >
              refresh
            </i>
          </a>
        </div>
      ) : (
        <Fragment>
          <div>
            {additional.params.name ? (
              <p>
                Search by keyword: `
                <strong className="red-color-text">
                  {additional.params.name}
                </strong>
                `
              </p>
            ) : (
              ""
            )}
          </div>
          <Pagination
            additional={additional}
            params={additional.params}
            getItems={getItems}
          />
          <div className="row">
            {items.map((item) => (
              <ItemSingle
                items={item}
                prices={item.price_list}
                rarity={item.rarity_type}
                key={item._id}
              />
            ))}
          </div>
          <Pagination
            additional={additional}
            params={additional.params}
            getItems={getItems}
          />
        </Fragment>
      )}
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
