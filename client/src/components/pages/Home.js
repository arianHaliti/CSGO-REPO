import React, { useState, useEffect, Fragment } from "react";
import SearchBar from "../../components/layout/SearchBar";
const Home = () => {
  const [search, setItems] = useState([]);
  return (
    <Fragment>
      <SearchBar />
    </Fragment>
  );
};

export default Home;
