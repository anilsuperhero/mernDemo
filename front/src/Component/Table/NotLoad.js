import React from "react"
import { Row, Col, Card } from "react-bootstrap"
import Button from "@material-ui/core/Button"

const NotFound = (prop) => {
  const { show, image } = prop
  const handleClickAdd = () => {
    prop.handleFormClick({}, true)
  }
  return (
    <Row>
      <Col>
        <Card>
          <Card.Body>
            <div className="text-center">
              <img src={image} alt="notfound" className="p-5" height="200px" />
              <h3>Sorry we couldn't find any data</h3>
              <Row className="text-center">
                <Col md={2} className="mt-3 mx-auto">
                  <div className="text-center">
                    {show && (
                      <Button
                        className="login-btn green-bg"
                        size="large"
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={() => handleClickAdd()}
                      >
                        Create
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  )
}

export default NotFound
