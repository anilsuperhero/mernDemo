import React, { useEffect } from "react"
import Aux from "../../hoc/_Aux"
import { Row, Col, Card } from "react-bootstrap"
import Form from "./form"
import { useSelector } from "react-redux"

const Index = (props) => {
  const { title } = props
  const { requestParams, documentParams } = useSelector((state) => ({
    requestParams: state.requestParams,
    documentParams: state.documentParams,
  }))
  useEffect(() => {
    document.title = title + documentParams.title
  })
  return (
    <>
      <Aux>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h5">{title + documentParams.title}</Card.Title>
                <br />
                <br />
                <span className="redHint">
                  Fields marked with * are mandatory.
                </span>
              </Card.Header>
              <Card.Body>
                <Form item={requestParams} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    </>
  )
}

export default Index
