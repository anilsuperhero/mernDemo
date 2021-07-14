import React, { useEffect } from "react"
import Aux from "../../hoc/_Aux"
import { Row, Col, Card } from "react-bootstrap"

import Form from "./form"
import { useSelector } from "react-redux"
const Index = (props) => {
  const { title } = props
  useEffect(() => {
    document.title = title
  })
  const { requestParams } = useSelector((state) => ({
    requestParams: state.requestParams,
  }))
  return (
    <>
      <Aux>
        <Row>
          <Col>
            <Row>
              <Col md={3}>
                <Card>
                  <div className="card-block">
                    <div className="text-center project-main">
                      <img
                        className="img-fluid rounded-circle"
                        src={requestParams.image}
                        alt="dashboard-user"
                      />
                      <h5 className="mt-4">{requestParams.company_name}</h5>
                      {requestParams.last_login_at && (
                        <>
                          <span className="d-block">Last Login</span>
                          <span className="d-block">
                            {requestParams.last_login_at}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </Card>
              </Col>
              <Col md={9}>
                <Card>
                  <Card.Header>
                    <Card.Title as="h5">{title}</Card.Title>
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
          </Col>
        </Row>
      </Aux>
    </>
  )
}

export default Index
