import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homePageActions from "../../actions/homePageActions";
import Button from "../Button";
import Animate from "./animate";

const Contact = (props) => {
  const { setting, actions } = props;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    actions.submitContactRequest(data);
  };
  return (
    <section className="contact_sec py-3 py-md-5" id="contact-us">
      <Container>
        <div className="heading_sec text-center mb-4 mb-md-5">
          <h2>Contact Us</h2>
          <div className="bar"></div>
        </div>
        <Row className="align-items-center">
          <Col lg={6} md={6} sm={6} className="mb-3">
            <div className="contact_form">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col lg={6} md={6}>
                    <TextField
                      id="outlined-name"
                      label="Name*"
                      variant="outlined"
                      className="w-100 mb-4"
                      error={errors.name ? true : false}
                      name="name"
                      inputRef={register({
                        required: "Please enter name.",
                        minLength: {
                          value: 3,
                          message: "name should contain atleast 3 characters.",
                        },
                        maxLength: {
                          value: 50,
                          message: "name should not exceed 50 characters.",
                        },
                      })}
                      helperText={errors.name && errors.name.message}
                      autoFocus={true}
                    />
                  </Col>
                  <Col lg={6} md={6}>
                    <TextField
                      variant="outlined"
                      id="outlined-email"
                      label="Email Address*"
                      className="w-100 mb-4"
                      error={errors.email ? true : false}
                      name="email"
                      inputRef={register({
                        required: "Please enter your email address",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                        maxLength: {
                          value: 50,
                          message: "Email should not exceed 50 characters.",
                        },
                      })}
                      helperText={errors.email && errors.email.message}
                    />
                  </Col>
                  <Col lg={12} md={12}>
                    <TextField
                      id="outlined-subject"
                      label="Number*"
                      variant="outlined"
                      className="w-100 mb-4"
                      error={errors.number ? true : false}
                      name="number"
                      inputRef={register({
                        minLength: {
                          value: 10,
                          message:
                            "Number should contain atleast 10 characters.",
                        },
                        maxLength: {
                          value: 10,
                          message: "Nmumber should not exceed 10 characters.",
                        },
                        pattern: {
                          value: /^[0-9\b]+$/i,
                          message:
                            "Mobile number format is incorrect using like(0012345684)",
                        },
                      })}
                      helperText={errors.number && errors.number.message}
                    />
                  </Col>
                  <Col lg={12} md={12}>
                    <TextField
                      id="outlined-message"
                      label="Message*"
                      variant="outlined"
                      className="w-100"
                      error={errors.message ? true : false}
                      name="message"
                      multiline={true}
                      rows={6}
                      inputRef={register({
                        required: "Please enter message",
                        minLength: {
                          value: 3,
                          message:
                            "Message should contain atleast 3 characters.",
                        },
                      })}
                      helperText={errors.message && errors.message.message}
                    />
                  </Col>
                  <Col lg={8}>
                    <Button
                      title={"Send Message"}
                      className={"btn btn-primary shadow-2  w-md-50"}
                    />
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
          <Col lg={6} md={6} sm={6}>
            <div className="contact_information">
              <h3>Contact with us by Your Phone Number or Email Address</h3>
              <h2>
                <a
                  href="#!"
                  className="mb-4"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  +{setting.number}
                </a>
                <span>Or</span>
                <a
                  href="#!"
                  className="mt-4"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <span className="">{setting.support_email}</span>
                </a>
              </h2>
            </div>
          </Col>
        </Row>
        <Animate />
      </Container>
    </section>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Object.assign(homePageActions), dispatch),
  };
}

export default connect(null, mapDispatchToProps)(Contact);
