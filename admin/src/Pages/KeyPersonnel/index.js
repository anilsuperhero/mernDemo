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
import View from "./view";
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "../../actions/keyPersonnelActions";
import { loadTableHeader } from "../../actions/baseActions";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, keyPerson } = useSelector((state) => ({
    isData: state.isData,
    keyPerson: state.keyPerson,
  }));
  const [modalViewShow, setViewModalShow] = useState(false);
  const [detail, setDetail] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tableHead = [
    {
      title: "Company",
      key: "company",
      type: "string",
      sort: null,
      show: true,
      class: "fas fa-sort",
      asc: "sort=company&direction=asc",
      desc: "sort=company&direction=desc",
    },
    {
      title: "Name",
      key: "first_name",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=first_name&direction=asc",
      desc: "sort=first_name&direction=desc",
    },
    {
      title: "Email",
      key: "email",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=email&direction=asc",
      desc: "sort=email&direction=desc",
    },
    {
      title: "Mobile Number",
      key: "mobile_number",
      type: "number",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=number&direction=asc",
      desc: "sort=number&direction=desc",
    },
    {
      title: "Updated At",
      key: "updated_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=updated_at&direction=asc",
      desc: "sort=updated_at&direction=desc",
    },
  ];
  const [list] = useState(tableHead);
  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/key-personnel`);
  };
  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    if (data.from) {
      params.set("from", data.from);
    }
    if (data.to) {
      params.set("to", data.to);
    }
    history.push({
      pathname: "/key-personnel",
      search: "?" + params,
    });
  };
  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/key-personnel",
      search: "?" + params,
    });
  };

  const handleViewclick = (data) => {
    setViewModalShow(true);
    setDetail(data);
  };
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
  }, [dispatch, list]);

  return (
    <>
      <Breadcrum title={title} />
      {isData ? (
        <>
          <SetValue list={list} />
          <Aux>
            <Row className="pt-3">
              <Search
                title={"Search by company, name, email, mobile number"}
                onClick={resetPage}
                onSearch={searchData}
                date={false}
                show={false}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {keyPerson.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {keyPerson.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"key-personnel"} />
                        <tbody>
                          {keyPerson &&
                            keyPerson.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleViewclick={handleViewclick}
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
          {modalViewShow && (
            <View
              show={modalViewShow}
              onHide={() => setViewModalShow(false)}
              detail={detail}
            />
          )}
        </>
      ) : (
        <NotLoad show={false} />
      )}
    </>
  );
};

export default Index;
