import React from "react";
import logo from "../../assets/images/seo.svg";
const NotFound = () => {
  return (
    <div className="text-center">
      <img src={logo} alt="notfound" className="p-5" width="200" />
      <h3>Sorry we couldn't find any matches</h3>
      <span>
        Maybe your search was too specific, please try searching with another
        term
      </span>
    </div>
  );
};

export default NotFound;
