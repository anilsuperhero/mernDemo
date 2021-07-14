import React from "react";
import Breadcrumb from "../../Component/Breadcrumb";
import View from "./View";
import Form from "./form";

function Index(props) {
  return (
    <>
      <Breadcrumb {...props} />
      <div className="right-contant">
        <h3 className="page-sm-title pb-1">My Account</h3>
        <div className="myaccount-outer">
          <View />
          <Form />
        </div>
      </div>
    </>
  );
}

export default Index;
