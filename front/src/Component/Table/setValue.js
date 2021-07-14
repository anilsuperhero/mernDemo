import React from "react";
import { useLocation } from "react-router-dom";
const queryString = require("query-string");

const SetValue = (props) => {
  const { list } = props; 
  const location = useLocation();
 

  const setSort = () => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    if (params.get("sort")) {
      var sort = queryStringParsed["sort"];
      var direction = queryStringParsed["direction"];
      for (var i = 0; i < list.length; i++) {
        const item = list[i];
        if (item.key === sort) {
          item.sort = direction;
          if (direction === "desc") {
            if (item.type === "string") {
              item.class = "fas fa-sort-alpha-down";
            } else {
              item.class = "fas fa-sort-numeric-down";
            }
          } else {
            if (item.type === "string") {
              item.class = "fas fa-sort-alpha-up";
            } else {
              item.class = "fas fa-sort-numeric-up";
            }
          }
        }
      }
    } 
  };
  setSort();

  return (
    <>
       
    </>
  );
};
 
export default  SetValue;
