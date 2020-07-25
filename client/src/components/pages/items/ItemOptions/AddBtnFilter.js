import React from "react";

const AddBtnFilter = () => {
  return (
    <div className=" row  col s1 right bottom" style={{ paddingTop: "30px" }}>
      <a
        href="#add-filter-modal"
        className="btn-floating btn-large blue darke-2 modal-trigger"
      >
        <i className="large material-icons  red lighten-1">filter_list</i>
      </a>
    </div>
  );
};

export default AddBtnFilter;
