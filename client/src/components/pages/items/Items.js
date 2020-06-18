import React, { useState, useEffect } from "react";
import ItemSingle from "./ItemSingle";
import axios from "axios";
const Item = () => {
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

  if (loading) {
    return <h4>Loading...</h4>;
  }
  return (
    <div className="row">
      {!loading && items.length === 0 ? (
        <p className="center">No items found...</p>
      ) : (
        items.map((item) => <ItemSingle item={item} key={item._id} />)
      )}
    </div>
  );
};

export default Item;
