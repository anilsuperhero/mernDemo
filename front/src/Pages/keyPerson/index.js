import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Card, Table } from "react-bootstrap";
import { useLocation, useHistory } from "react-router-dom";
import { team } from "../../assets/img/index";
import {
  loadData,
  deleteKeyPersonnelData,
} from "../../actions/keyPersonalActions";
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
import Definition from "./definition";

function Index(props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogView, setOpenDialogView] = useState(false);
  const [openDefinitionDialog, setOpenDefinitionDialog] = useState(false);
  const [item, setItem] = useState({});
  const [dialog, setDialog] = useState({});
  const dispatch = useDispatch();
  const history = useHistory();
  const { keyPerson, isData, dialogOpen } = useSelector((state) => ({
    keyPerson: state.keyPerson,
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
      title: "Position Held",
      key: "positionHeld",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=positionHeld&direction=asc",
      desc: "sort=positionHeld&direction=desc",
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

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/user/key-person`);
  };

  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    history.push({
      pathname: "/user/key-person",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/user/key-person",
      search: "?" + params,
    });
  };

  const handleViewClick = (item) => {
    setItem(item);
    setOpenDialogView(true);
  };

  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteKeyPersonnelData(data._id));
    } else {
      data.message = "Are you sure, you want to delete ";
      data.title = data.first_name + " " + data.last_name;
      data.dialogTitle = "Delete Key Personnel";
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
  };

  const handleDefinitionClose = () => {
    setOpenDefinitionDialog(false);
  };
  const openDefinition = () => {
    setOpenDefinitionDialog(true);
  };

  return (
    <>
      <Breadcrumb {...props} />
      <div className="right-contant">
        <h3 className="page-sm-title pb-1">Key Personnel</h3>
        {isData ? (
          <>
            <SetValue list={list} />
            <Row className="pt-3">
              <Search
                onClick={resetPage}
                onSearch={searchData}
                date={false}
                show={true}
                keyPerson={true}
                status={false}
                title={"Search by Name / Email / Mobile Number"}
                handleFormClick={handleFormClick}
                openDefinition={openDefinition}
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
                      <Table>
                        <Thead title={"user/key-person"} />
                        <tbody>
                          {keyPerson &&
                            keyPerson.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleFormClick={handleFormClick}
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
          </>
        ) : (
          <NotLoad
            image={team}
            show={true}
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
      {openDefinitionDialog && (
        <Definition
          open={openDefinitionDialog}
          handleClose={handleDefinitionClose}
        />
      )}
    </>
  );
}

export default Index;
