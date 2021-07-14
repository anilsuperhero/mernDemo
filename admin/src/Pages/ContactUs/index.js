import React, { useEffect, useState } from "react"
import { useLocation, useHistory } from "react-router-dom"
import Aux from "../../hoc/_Aux"
import { Row, Col, Card, Table } from "react-bootstrap"
import Breadcrum from "../../Component/Breadcrum"
import Search from "../../Component/Table/search"
import NotFound from "../../Component/Table/NotFound"
import NotLoad from "../../Component/Table/NotLoad"
import Thead from "../../Component/Table/thead"
import SetValue from "../../Component/Table/setValue"
import Paginate from "../../Component/Table/Paginate"
import Delete from "../../Component/Delete"
import List from "./list"
import View from "./view"
import { useSelector, useDispatch } from "react-redux"
import { loadData, deleteData } from "../../actions/contactActions"
import { loadTableHeader, loadDialogData } from "../../actions/baseActions"
const queryString = require("query-string")

const Index = (props) => {
  const { title } = props
  const { isData, contactData, dialogOpen } = useSelector((state) => ({
    isData: state.isData,
    contactData: state.contactData,
    dialogOpen: state.dialogOpen,
  }))
  const [modalViewShow, setViewModalShow] = useState(false)
  const [dialog, setDialog] = useState({})
  const [contactItem, setConatctItem] = useState({})
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
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
      title: "Updated At",
      key: "updated_at",
      type: "date",
      sort: null,
      class: "fas fa-sort",
      asc: "sort=updated_at&direction=asc",
      desc: "sort=updated_at&direction=desc",
    },
  ]
  const [list] = useState(tableHead)
  const resetPage = () => {
    dispatch(loadTableHeader(tableHead))
    history.push(`/contact-us`)
  }
  const searchData = (data) => {
    const params = new URLSearchParams(location.search)
    if (data.keyword) {
      params.set("keyword", data.keyword)
    }
    if (data.from) {
      params.set("from", data.from)
    }
    if (data.to) {
      params.set("to", data.to)
    }
    history.push({
      pathname: "/contact-us",
      search: "?" + params,
    })
  }
  const handlePageClick = (data) => {
    let page = data
    const params = new URLSearchParams(location.search)
    params.set("page", page)
    history.push({
      pathname: "/contact-us",
      search: "?" + params,
    })
  }
  const handleDeleteClick = (data) => {
    if (data.action) {
      dispatch(deleteData(data._id))
    } else {
      data.message = "Are you sure, you want to delete "
      data.title = data.first_name + " " + data.last_name
      data.dialogTitle = "Delete Contact Us Request"
      data.open = true
      setDialog(data)
      dispatch(loadDialogData(true))
    }
  }

  const handleViewclick = (data) => {
    setViewModalShow(true)
    setConatctItem(data)
  }
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const queryStringParsed = queryString.parse(location.search)
    const request = {}
    if (params.get("sort")) {
      var sort = queryStringParsed["sort"]
      var direction = queryStringParsed["direction"]
      request.sort = sort
      request.direction = direction
    }
    if (params.get("page")) {
      var page = queryStringParsed["page"]
      request.page = page
    }
    if (params.get("keyword")) {
      var keyword = queryStringParsed["keyword"]
      request.keyword = keyword
    }

    document.title = title
    dispatch(loadData(request))
  }, [title, dispatch, location])

  useEffect(() => {
    dispatch(loadTableHeader(list))
  }, [dispatch, list])

  return (
    <>
      <Breadcrum title={title} />
      {isData ? (
        <>
          <SetValue list={list} />
          <Aux>
            <Row className="pt-3">
              <Search
                title={"Search by name, email, mobile number"}
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
                    {contactData.length > 0 && (
                      <Paginate onClick={handlePageClick} />
                    )}

                    {contactData.length > 0 ? (
                      <Table striped responsive>
                        <Thead title={"contact-us"} />
                        <tbody>
                          {contactData &&
                            contactData.map((item, key) => (
                              <List
                                item={item}
                                key={key}
                                handleDeleteClick={handleDeleteClick}
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
              contactdetail={contactItem}
            />
          )}
          {dialogOpen && (
            <Delete dialog={dialog} handleDeleteClick={handleDeleteClick} />
          )}
        </>
      ) : (
        <NotLoad show={false} />
      )}
    </>
  )
}

export default Index
