import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Aux from "../../hoc/_Aux";
import { Row, Col, Card, Table } from "react-bootstrap";
import Breadcrum from "../../Component/Breadcrum";
import Search from "../../Component/Table/search";
import NotFound from "../../Component/Table/NotFound";
import NotLoad from "../../Component/Table/NotLoad";
import Thead from "../../Component/Table/thead";
import SetValue from "../../Component/Table/setValue";
import Paginate from "../../Component/Table/Paginate";
import List from "./list";
import { loadData } from "../../actions/pageActions";
import { loadTableHeader, loadRequestData } from "../../actions/baseActions";
import { useSelector, useDispatch } from "react-redux";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, pageData } = useSelector((state) => ({
    isData: state.isData,
    pageData: state.pageData,
  }));
  const tableHead = [
    {
      title: "Title",
      key: "title",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=title&direction=asc",
      desc: "sort=title&direction=desc",
    },
    {
      title: "Created At",
      key: "created_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=created_at&direction=asc",
      desc: "sort=created_at&direction=desc",
    },
  ];
  const [list] = useState(tableHead);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    const request = {};
    if (params.get("sort")) {
      var sort = queryStringParsed["sort"];
      var direction = queryStringParsed["direction"];
      request.sort = sort;
      request.direction = direction;
    }
    if (params.get("page")) {
      var page = queryStringParsed["page"];
      request.page = page;
    }
    if (params.get("keyword")) {
      var keyword = queryStringParsed["keyword"];
      request.keyword = keyword;
    }
    document.title = title;
    dispatch(loadData(request));
  }, [title, dispatch, location]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [list, dispatch]);

  const handleFormClick = (item) => {
    dispatch(loadRequestData(item));
    history.push(`/cms/edit/${item.slug}`);
  };

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/cms`);
  };

  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }

    history.push({
      pathname: "/cms",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/cms",
      search: "?" + params,
    });
  };

  return (
    <>
      <Breadcrum title={title} />
      {isData ? (
        <>
          <SetValue list={list} />
          <Aux>
            <Row className="pt-3">
              <Search
                onClick={resetPage}
                onSearch={searchData}
                show={false}
                handleFormClick={handleFormClick}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    {pageData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}
                    {pageData.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"cms"} />
                        <tbody>
                          {pageData &&
                            pageData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleFormClick={handleFormClick}
                              />
                            ))}
                        </tbody>
                      </Table>
                    ) : (
                      <NotFound />
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Aux>
        </>
      ) : (
        <NotLoad show={false} handleFormClick={handleFormClick} />
      )}
    </>
  );
};

export default Index;
