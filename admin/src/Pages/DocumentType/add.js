import React, { useEffect } from "react"
import Aux from "../../hoc/_Aux"
import { Row, Col, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import Form from "./form"

const Index = (props) => {
  const { title } = props
  const { documentParams } = useSelector((state) => ({
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
                <Form item={{}} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Aux>
    </>
  )
}

export default Index
