import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { submitDocumentSign } from "../../actions/auditRequestActions";
import Breadcrumb from "../../Component/Breadcrumb";
import { useLocation, useHistory } from "react-router-dom";

const Index = (props) => {
  const dispatch = useDispatch();
  const queryString = require("query-string");
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    const fetchData = () => {
      const params = queryString.parse(location.search);
      if (params.event === "signing_complete") {
        const request = {};
        request.state = params.state;
        console.log("request ==>", request);
        dispatch(submitDocumentSign(request, history));
      } else {
        history.push("audit-request");
      }
      //dispatch(submitDocumentSign(slug,history));
    };
    fetchData();
  }, [dispatch, location, queryString, history]);

  return (
    <>
      <Breadcrumb {...props} />
    </>
  );
};

export default Index;
