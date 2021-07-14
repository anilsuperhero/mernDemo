import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const queryString = require("query-string");

const Paginate = (props) => {
  const { pagination } = useSelector((state) => ({
    pagination: state.pagination,
  }));
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    if (params.get("page")) {
      var page = queryStringParsed["page"];
      setPage(parseInt(page));
    }
  }, [location]);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.onClick(value);
  };

  return (
    <>
      <div className="pagination_sec">
        <Row>
          <Col>
            {pagination && pagination.count > 0 && (
              <div>
                Showing {pagination.from} to {pagination.to} of &nbsp;
                {pagination.total} entries
              </div>
            )}
          </Col>
          <Col>
            {pagination && pagination.count > 0 && (
              <div className="mb-3 pagination">
                <Pagination
                  color="primary"
                  count={pagination.total_pages}
                  page={page}
                  onChange={handleChange}
                />
              </div>
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Paginate;
