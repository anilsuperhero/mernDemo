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
import Delete from "../../Component/Delete";
import { useSelector, useDispatch } from "react-redux";
import {
  loadData,
  updateRegistrationgroupData,
  deleteRegistrationgroupData,
} from "../../actions/registrationGroupActions";
import {
  loadTableHeader,
  loadRequestData,
  loadDocumentRequestData,
  loadDialogData,
} from "../../actions/baseActions";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, registrationgroupData, dialogOpen } = useSelector(
    (state) => ({
      isData: state.isData,
      registrationgroupData: state.registrationgroupData,
      dialogOpen: state.dialogOpen,
    })
  );
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState({});
  const location = useLocation();
  const history = useHistory();
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

  const handleFormClick = (item) => {
    if (item._id) {
      dispatch(loadRequestData(item));
      history.push(`/documents/registration-group/edit/${item.slug}`);
    } else {
      history.push(`/documents/registration-group/create`);
    }
  };

  const handleDocumentclick = (item) => {
    dispatch(loadDocumentRequestData(item));
    history.push(`/documents/registration-group/document-type`);
  };

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/documents/registration-group`);
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
      pathname: "/documents/registration-group",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/documents/registration-group",
      search: "?" + params,
    });
  };
  const handleSwitchClick = (data) => {
    dispatch(updateRegistrationgroupData(data));
  };

  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteRegistrationgroupData(data._id));
    } else {
      data.message = "Are you sure, you want to delete ";
      data.dialogTitle = "Delete Registration Group";
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
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
    if (params.get("status")) {
      var status = queryStringParsed["status"];
      request.status = status;
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
                onClick={resetPage}
                onSearch={searchData}
                date={false}
                show={true}
                status={true}
                handleFormClick={handleFormClick}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {registrationgroupData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}
                    {registrationgroupData.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"documents/registration-group"} />
                        <tbody>
                          {registrationgroupData &&
                            registrationgroupData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleFormClick={handleFormClick}
                                handleSwitchClick={handleSwitchClick}
                                handleDeleteClick={handleDeleteClick}
                                handleDocumentclick={handleDocumentclick}
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
    </>
  );
};

export default Index;
