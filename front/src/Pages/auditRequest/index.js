import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Table } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { team } from "../../assets/img/index";
import {
  loadData,
  deleteRequestData,
  loadRegistrationGroupData,
} from "../../actions/auditRequestActions";
import { loadTableHeader, loadDialogData } from "../../actions/baseActions";
import Breadcrumb from "../../Component/Breadcrumb";
import NotLoad from "../../Component/Table/NotLoad";
import Thead from "../../Component/Table/thead";
import Search from "../../Component/Table/search";
import SetValue from "../../Component/Table/setValue";
import Paginate from "../../Component/Table/Paginate";
import NotFound from "../../Component/Table/NotFound";
import Delete from "../../Component/Delete";
import Form from "./form";
import View from "./view";
import List from "./list";
import Action from "./action";
import SLAView from "./slaView";
import Payment from "./payment";

function Index(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openActionView, setOpenActionView] = useState(false);
  const [slaViewAction, setSlaViewAction] = useState(false);
  const [slaPaymentAction, setSlaPaymentAction] = useState(false);
  const [item, setItem] = useState({});
  const [dialog, setDialog] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { auditData, isData, dialogOpen } = useSelector((state) => ({
    auditData: state.auditData,
    isData: state.isData,
    dialogOpen: state.dialogOpen,
  }));
  const location = useLocation();
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCloseView = () => {
    setOpenDialogView(false);
  };
  const queryString = require("query-string");
  const handleFormClick = (item) => {
    setItem(item);
    setOpenDialog(true);
  };

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
      title: "Created At",
      key: "created_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=created_at&direction=asc",
      desc: "sort=created_at&direction=desc",
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

    dispatch(loadData(request));
  }, [dispatch, location, queryString]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [list, dispatch]);

  useEffect(() => {
    dispatch(loadRegistrationGroupData());
  }, [dispatch]);

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/audit-request`);
  };

  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    if (data.keyword) {
      params.set("keyword", data.keyword);
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

  const handleViewClick = (item) => {
    setItem(item);
    setOpenDialogView(true);
  };

  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteRequestData(data._id));
    } else {
      data.message = "Are you sure, you want to delete ";
      data.title = data.title + " (" + data.audit_number + " )";
      data.dialogTitle = "Delete Audit Request";
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
  };

  const handleActionClick = (data) => {
    setItem(data);
    setOpenActionView(true);
  };
  const handlePaymentClick = (data) => {
    setItem(data);
    setSlaPaymentAction(true);
  };

  const handlePaymentCloseClick = () => {
    setSlaPaymentAction(false);
  };

  const onClose = () => {
    setOpenActionView(false);
  };

  const handleSlaView = (action) => {
    if (action.paymentView) {
      setItem(action);
      setSlaPaymentAction(true);
      setSlaViewAction(false);
    } else if (action._id) {
      setItem(action);
      setSlaViewAction(true);
    } else {
      setSlaViewAction(false);
    }
  };

  return (
    <>
      <Breadcrumb {...props} />
      <div className="right-contant">
        <h3 className="page-sm-title pb-1">{props.title}</h3>
        {isData ? (
          <>
            <SetValue list={list} />
            <Row className="pt-3">
              <Search
                onClick={resetPage}
                onSearch={searchData}
                date={false}
                show={false}
                status={false}
                title={"Search by Title / Audit Number"}
                handleFormClick={handleFormClick}
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
                      <Table>
                        <Thead title={"audit-request"} />
                        <tbody>
                          {auditData &&
                            auditData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleActionClick={handleActionClick}
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
          </>
        ) : (
          <NotLoad
            image={team}
            show={false}
            handleFormClick={handleFormClick}
            item={item}
          />
        )}
      </div>
      {openDialog && (
        <Form open={openDialog} handleClose={handleClose} keyItem={item} />
      )}
      {dialogOpen && (
        <Delete dialog={dialog} handleDeleteClick={handleDeleteClick} />
      )}
      {openDialogView && (
        <View
          open={openDialogView}
          handleClose={handleCloseView}
          keyItem={item}
        />
      )}
      {openActionView && (
        <Action
          open={openActionView}
          item={item}
          onClose={onClose}
          handleFormClick={handleFormClick}
          handleViewClick={handleViewClick}
          handleDeleteClick={handleDeleteClick}
          handleSlaView={handleSlaView}
          handlePaymentClick={handlePaymentClick}
        />
      )}
      {slaViewAction && (
        <SLAView
          open={slaViewAction}
          handleClose={handleSlaView}
          keyItem={item}
        />
      )}
      {slaPaymentAction && (
        <Payment
          open={slaPaymentAction}
          handleClose={handlePaymentCloseClick}
          keyItem={item}
        />
      )}
    </>
  );
}

export default Index;
