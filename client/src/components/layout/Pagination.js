import React from "react";

const Pagination = ({
  additional: { page, itemperpage, skip, count, params },
  getItems,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(count / itemperpage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul className="pagination center">
        <li className={page === 1 ? "disabled " : "active"}>
          <a
            href="#!"
            onClick={() => {
              params.page = --page;
              getItems(params);
            }}
          >
            <i className="material-icons">chevron_left</i>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li className={number === page ? "active" : ""} key={number}>
            <a
              href="#!"
              onClick={() => {
                params.page = number;
                getItems(params);
              }}
            >
              {number}
            </a>
          </li>
        ))}

        <li className={page === pageNumbers.length ? "disabled" : "active"}>
          <a
            href="#!"
            onClick={() => {
              params.page = ++page;
              getItems(params);
            }}
          >
            <i className="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
