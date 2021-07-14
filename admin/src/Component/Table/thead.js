import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Thead = (props) => {
  const location = useLocation();
  const history = useHistory();
  const { isHead } = useSelector((state) => ({
    isHead: state.isHead,
  }));
  const requestSort = (title) => {
    const headerList = [];
    for (var i = 0; i < isHead.length; i++) {
      const item = isHead[i];
      if (item.title === title) {
        if (item.sort === null || item.sort === "desc") {
          item.sort = "asc";
          handleClickFilter(item.sort, item.key);
          if (item.type === "string") {
            item.class = "fas fa-sort-alpha-up";
          } else {
            item.class = "fas fa-sort-numeric-up";
          }
        } else if (item.sort === "asc") {
          item.sort = "desc";
          handleClickFilter(item.sort, item.key);
          if (item.type === "string") {
            item.class = "fas fa-sort-alpha-down";
          } else {
            item.class = "fas fa-sort-numeric-down";
          }
        }
      } else {
        item.sort = null;
        item.class = "fas fa-sort";
      }
      headerList.push(item);
    }
  };

  const handleClickFilter = (type, key) => {
    const params = new URLSearchParams(location.search);
    params.set("sort", key);
    params.set("direction", type);
    history.push({
      pathname: `/${props.title}`,
      search: "?" + params,
    });
  };
  return (
    <thead>
      <tr>
        {isHead.map((item, key) =>
          item.show ? (
            <th key={key} style={{ width: item.title === "Status" && "150px" }}>
              <span>{item.title} &nbsp;</span>
            </th>
          ) : (
            <th
              key={key}
              onClick={() => requestSort(item.title)}
              style={{ width: item.title === "Status" && "150px" }}
            >
              <span>
                {item.title} &nbsp;
                {item.title !== "Image" && <i className={item.class}></i>}
              </span>
            </th>
          )
        )}
        <th>Action</th>
      </tr>
    </thead>
  );
};

export default Thead;
