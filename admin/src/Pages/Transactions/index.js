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
import PDFView from "../AuditRequest/pdfViewer";
import { useSelector, useDispatch } from "react-redux";
import { loadData } from "../../actions/transactionActions";
import { loadTableHeader } from "../../actions/baseActions";
const queryString = require("query-string");

const Index = (props) => {
  const { title } = props;
  const { isData, transactionsList } = useSelector((state) => ({
    isData: state.isData,
    transactionsList: state.transactionsList,
  }));
  const [pdfUrl, setPdfUrl] = useState({});
  const [viewPdf, setPdfViewer] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const tableHead = [
    {
      title: "Recipt Number",
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
      title: "Company",
      key: "company",
      type: "string",
      sort: null,
      class: "fas fa-sort",
      show: true,
      asc: "sort=company&direction=asc",
      desc: "sort=company&direction=desc",
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
  const resetPage = () => {
    dispatch(loadTableHeader(tableHead));
    history.push(`/transaction`);
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
      pathname: "/transaction",
      search: "?" + params,
    });
  };
  const handlePageClick = (data) => {
    let page = data;
    const params = new URLSearchParams(location.search);
    params.set("page", page);
    history.push({
      pathname: "/transaction",
      search: "?" + params,
    });
  };

  const handleViewclick = (data) => {
    setPdfUrl(data);
    setPdfViewer(true);
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

  const handleClosePDFView = () => {
    setPdfViewer(false);
  };

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

  return (
    <>
      <Breadcrum title={title} />
      {isData ? (
        <>
          <SetValue list={list} />
          <Aux>
            <Row className="pt-3">
              <Search
                title={"Search by recipt number, audit number"}
                onClick={resetPage}
                onSearch={searchData}
                date={true}
                show={false}
              />
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body className="card code-table">
                    {transactionsList.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {transactionsList.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"transaction"} />
                        <tbody>
                          {transactionsList &&
                            transactionsList.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleViewclick={handleViewclick}
                                handleDownloadclick={handleDownloadclick}
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
          {viewPdf && (
            <PDFView
              open={viewPdf}
              handleClose={handleClosePDFView}
              detail={pdfUrl.invoice}
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
