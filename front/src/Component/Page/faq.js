import React, { useState } from "react"
import { Container, Row, Col, Accordion, Card } from "react-bootstrap"

const Faq = (props) => {
  const { homePageData } = props
  const [activeId, setActiveId] = useState(1)
  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" }
    }
    return { __html: "" }
  }
  return (
    <section className="freq_sec pt-5" id="faq">
      <Container>
        <div className="heading_sec text-center mb-4 mb-md-5">
          <h2 className="">Frequently Asked Questions</h2>
          <div className="bar"></div>
        </div>
        <Row>
          <Col lg={12}>
            {homePageData.faq && (
              <div className="freq_sec_inner">
                <Accordion defaultActiveKey={1}>
                  {homePageData.faq.map((item, key) => (
                    <Card key={key + 1}>
                      <Accordion.Toggle
                        as={Card.Header}
                        eventKey={key + 1}
                        onClick={() =>
                          setActiveId(activeId === key + 1 ? 0 : key + 1)
                        }
                      >
                        <i
                          className={
                            key + 1 === activeId
                              ? "fas fa-angle-down"
                              : "fas fa-angle-right"
                          }
                        ></i>
                        {item.title}
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey={key + 1}>
                        <Card.Body>
                          <div
                            dangerouslySetInnerHTML={prepareHtml(
                              item.subscription
                            )}
                          />
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  ))}
                </Accordion>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Faq
