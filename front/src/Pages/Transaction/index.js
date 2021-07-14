import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Row, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { loadTableHeader } from "../../actions/baseActions";
import { loadData } from "../../actions/transactionAction";
import { TRANSACTIONS } from "../../assets/img/index";
import Breadcrumb from "../../Component/Breadcrumb";
import NotFound from "../../Component/Table/NotFound";
import NotLoad from "../../Component/Table/NotLoad";
import Paginate from "../../Component/Table/Paginate";
import Search from "../../Component/Table/search";
import SetValue from "../../Component/Table/setValue";
import Thead from "../../Component/Table/thead";
import List from "./list";
import PDFView from "../auditRequest/pdfViewer";

function Index(props) {
  const dispatch = useDispatch();
  const [pdfUrl, setPdfUrl] = useState({});
  const [viewPdf, setPdfViewer] = useState(false);
  const history = useHistory();
  const { transactionData, isData } = useSelector((state) => ({
    transactionData: state.transactionData,
    isData: state.isData,
  }));
  const location = useLocation();

  const queryString = require("query-string");

  const handleDownloadclick = (data) => {
    var url = data.invoice;
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", data._id + ".pdf");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
  };

  const tableHead = [
    {
      title: "Receipt Number",
      key: "reciptNumber",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=reciptNumber&direction=asc",
      desc: "sort=reciptNumber&direction=desc",
    },
    {
      title: "Amount",
      key: "amount",
      type: "number",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=amount&direction=asc",
      desc: "sort=amount&direction=desc",
    },
    {
      title: "Audit",
      key: "audit",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      show: true,
      asc: "sort=audit&direction=asc",
      desc: "sort=audit&direction=desc",
    },
    {
      title: "Payment Id",
      key: "paymentId",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=paymentId&direction=asc",
      desc: "sort=paymentId&direction=desc",
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

  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/user/transactions`);
  };

  const searchData = (data) => {
    const params = new URLSearchParams(location.search);
    if (data.keyword) {
      params.set("keyword", data.keyword);
    }
    history.push({
      pathname: "/user/transactions",
      search: "?" + params,
    });
  };

  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/user/transactions",
      search: "?" + params,
    });
  };

  const handleViewclick = (data) => {
    setPdfUrl(data);
    setPdfViewer(true);
  };

  const handleClosePDFView = () => {
    setPdfViewer(false);
  };

  return (
    <Fragment>
      <Breadcrumb {...props} />
      <div className="right-contant">
        <h3 className="page-sm-title pb-1">Transactions</h3>
        {isData ? (
          <Fragment>
            <SetValue list={list} />
            <Row className="pt-3">
              <Search
                onClick={resetPage}
                onSearch={searchData}
                date={false}
                show={false}
                transaction={true}
                status={false}
                title={"Search by receipt number, audit number"}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {transactionData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}
                    {transactionData.length > 0 ? (
                      <Table>
                        <Thead title={"user/transactions"} />
                        <tbody>
                          {transactionData &&
                            transactionData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleDownloadclick={handleDownloadclick}
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
          </Fragment>
        ) : (
          <NotLoad image={TRANSACTIONS} show={false} />
        )}
        {viewPdf && (
          <PDFView
            open={viewPdf}
            handleClose={handleClosePDFView}
            detail={pdfUrl.invoice}
          />
        )}
      </div>
    </Fragment>
  );
}

export default Index;
