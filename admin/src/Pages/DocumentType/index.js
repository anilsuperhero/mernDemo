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
import Delete from "../../Component/Delete";
import List from "./list";
import { useSelector, useDispatch } from "react-redux";

import {
  loadData,
  updateDocumentTypeData,
  deleteDocumentTypeData,
} from "../../actions/documentTypeActions";
import {
  loadTableHeader,
  loadRequestData,
  loadDialogData,
} from "../../actions/baseActions";

const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, documentTypeData, documentParams, dialogOpen } = useSelector(
    (state) => ({
      isData: state.isData,
      documentTypeData: state.documentTypeData,
      documentParams: state.documentParams,
      dialogOpen: state.dialogOpen,
    })
  );
  const [dialog, setDialog] = useState({});
  const dispatch = useDispatch();
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
      title: "Type",
      key: "type",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=type&direction=asc",
      desc: "sort=type&direction=desc",
    },
    {
      title: "Extension",
      key: "type",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=type&direction=asc",
      desc: "sort=type&direction=desc",
      show: true,
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
      history.push(
        `/documents/registration-group/document-type/edit/${item.slug}`
      );
    } else {
      history.push(`/documents/registration-group/document-type/create`);
    }
  };

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/documents/registration-group/document-type`);
  };

  const handleBackButtonClick = () => {
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
      pathname: "/documents/registration-group/document-type",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/documents/registration-group/document-type",
      search: "?" + params,
    });
  };

  const handleSwitchClick = (data) => {
    dispatch(updateDocumentTypeData(data));
  };

  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteDocumentTypeData(data._id, documentParams._id));
    } else {
      data.message = "Are you sure, you want to delete ";
      data.dialogTitle = "Delete Document Type";
      data.open = true;
      setDialog(data);
      dispatch(loadDialogData(true));
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const queryStringParsed = queryString.parse(location.search);
    const request = {};
    request.groupId = documentParams._id;
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
    document.title = title + documentParams.title;
    dispatch(loadData(request));
  }, [title, dispatch, location, documentParams]);

  useEffect(() => {
    dispatch(loadTableHeader(list));
  }, [dispatch, list, documentParams]);

  return (
    <>
      <Breadcrum title={title + documentParams.title} />
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
                back={true}
                status={true}
                handleFormClick={handleFormClick}
                handleBackButtonClick={handleBackButtonClick}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {documentTypeData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {documentTypeData.length > 0 ? (
                      <Table striped responsive>
                        <Thead
                          title={"documents/registration-group/document-type"}
                        />
                        <tbody>
                          {documentTypeData &&
                            documentTypeData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleFormClick={handleFormClick}
                                handleSwitchClick={handleSwitchClick}
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
    </>
  );
};

export default Index;
