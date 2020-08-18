import React from "react";

const Pagination = (itemPerPage, totalItems) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <ul class="pagination center">
        <li class="disabled">
          <a href="#!">
            <i class="material-icons">chevron_left</i>
          </a>
        </li>
        {pageNumbers.map((number) => (
          <li class="active">
            <a href="#!">{number}</a>
          </li>
        ))}

        <li class="waves-effect">
          <a href="#!">
            <i class="material-icons">chevron_right</i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
