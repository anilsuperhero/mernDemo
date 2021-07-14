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
import SlaUpload from "./slaUpload";
import { useSelector, useDispatch } from "react-redux";
import {
  loadData,
  loadRegistrationGroupData,
} from "../../actions/auditRequestActions";
import { loadTableHeader } from "../../actions/baseActions";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, auditData } = useSelector((state) => ({
    isData: state.isData,
    auditData: state.auditData,
  }));
  const [detail, setDetail] = useState({});
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openDialogUploadSLA, setOpenDialogSLA] = useState(false);
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
      title: "Title",
      key: "title",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=title&direction=asc",
      desc: "sort=title&direction=desc",
    },
    {
      title: "Audit Number",
      key: "audit_number",
      type: "number",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=audit_number&direction=asc",
      desc: "sort=audit_number&direction=desc",
    },
    {
      title: "Type",
      key: "type",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=type&direction=asc",
      desc: "sort=type&direction=desc",
    },
    {
      title: "Status",
      key: "status",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=status&direction=asc",
      desc: "sort=status&direction=desc",
    },
    {
      title: "Signed By",
      key: "sign_type",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=sign_type&direction=asc",
      desc: "sort=sign_type&direction=desc",
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
    history.push(`/audit-request`);
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
    if (data.status) {
      if (parseInt(data.status) === 3) {
        params.delete("status");
      }
      if (parseInt(data.status) !== 3) {
        params.set("status", data.status);
      }
    }
    history.push({
      pathname: "/audit-request",
      search: "?" + params,
    });
  };
  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/audit-request",
      search: "?" + params,
    });
  };

  const handleViewclick = (data) => {
    if (data.step === "SLA") {
      setOpenDialogSLA(true);
    } else {
      setOpenDialogView(true);
    }
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
    if (params.get("to")) {
      var to = queryStringParsed["to"];
      request.created_at_to = to;
    }
    if (params.get("from")) {
      var from = queryStringParsed["from"];
      request.created_at_from = from;
    }
    if (params.get("status")) {
      var status = queryStringParsed["status"];
      request.status = status;
    }
    document.title = title;
    dispatch(loadData(request));
    dispatch(loadRegistrationGroupData());
  }, [title, dispatch, location]);
  const handleCloseView = (type) => {
    if (type === "SLA") {
      setOpenDialogSLA(false);
    } else {
      setOpenDialogView(false);
    }
  };
  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [dispatch, list]);
  const handleFormClick = () => {
    history.push(`/audit-request/create`);
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
                title={"Search by company, title, audit number"}
                onClick={resetPage}
                onSearch={searchData}
                date={true}
                show={true}
                handleFormClick={handleFormClick}
                requestShow={true}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {auditData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {auditData.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"audit-request"} />
                        <tbody>
                          {auditData &&
                            auditData.map((item, key) => (
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
          {openDialogView && (
            <View
              open={openDialogView}
              handleClose={handleCloseView}
              detail={detail}
            />
          )}
          {openDialogUploadSLA && (
            <SlaUpload
              open={openDialogUploadSLA}
              handleClose={handleCloseView}
              detail={detail}
            />
          )}
        </>
      ) : (
        <NotLoad show={true} handleFormClick={handleFormClick} />
      )}
    </>
  );
};

export default Index;
