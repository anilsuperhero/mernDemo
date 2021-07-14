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
import ViewDetails from "./UserInfo";
import Delete from "../../Component/Delete";
import {
  loadData,
  updateauditorData,
  deleteauditorData,
} from "../../actions/auditorActions";
import {
  loadTableHeader,
  loadRequestData,
  loadDialogData,
} from "../../actions/baseActions";
import { useSelector, useDispatch } from "react-redux";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, auditorData, dialogOpen } = useSelector((state) => ({
    isData: state.isData,
    auditorData: state.auditorData,
    dialogOpen: state.dialogOpen,
  }));
  const tableHead = [
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
      title: "Registered At",
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
  const [dialog, setDialog] = useState({});

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
  }, [title, dispatch, location]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [list, dispatch]);

  const handleFormClick = (item) => {
    if (item._id) {
      dispatch(loadRequestData(item));
      history.push(`/users/auditor/edit/${item._id}`);
    } else {
      dispatch(loadRequestData(item));
      history.push(`/users/auditor/create`);
    }
  };

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/users/auditor`);
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
      pathname: "/users/auditor",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/users/auditor",
      search: "?" + params,
    });
  };

  const handleSwitchClick = (data) => {
    dispatch(updateauditorData(data));
  };

  const handlePasswordClick = (item) => {
    dispatch(loadRequestData(item));
    history.push(`/users/auditor/change-password/${item.id}`);
  };
  const [modalShow, setModalShow] = useState(false);
  const [userInfo, setuserInfo] = useState(null);
  const handleViewClick = (item) => {
    setuserInfo(item);
    setModalShow(true);
  };
  const handleModalClick = () => {
    setModalShow(false);
  };

  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteauditorData(data._id));
    } else {
      data.message = "Are you sure, you want to delete ";
      data.title = data.first_name + " " + data.last_name;
      data.dialogTitle = "Delete Auditor";
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
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
                date={true}
                show={true}
                status={true}
                title={"Search by Name / Email / Mobile Number"}
                handleFormClick={handleFormClick}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {auditorData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {auditorData.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"users/auditor"} />
                        <tbody>
                          {auditorData &&
                            auditorData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleFormClick={handleFormClick}
                                handleSwitchClick={handleSwitchClick}
                                handlePasswordClick={handlePasswordClick}
                                handleViewClick={handleViewClick}
                                handleDeleteClick={handleDeleteClick}
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
          {dialogOpen && (
            <Delete dialog={dialog} handleDeleteClick={handleDeleteClick} />
          )}
        </>
      ) : (
        <NotLoad show={true} handleFormClick={handleFormClick} />
      )}
      {modalShow && (
        <ViewDetails
          show={modalShow}
          onHide={handleModalClick}
          userInfo={userInfo}
        />
      )}
    </>
  );
};

export default Index;
