import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as homePageActions from "../../actions/homePageActions";
import Button from "../Button";
import Animate from "./animate";

const Home = (props) => {
  const { setting, actions } = props;
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data) => {
    actions.submitContactRequest(data);
  };
  return (
    <section className="banner_sec">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} md={6}>
            <div className="banner_side_content">
              <h1>Banknifty PMS Customized Portfolio Management Service</h1>
              <p>Create Legacy Wealth</p>
              <div className="banner-holder mt-4">
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(setting.google_link, "_blank");
                  }}
                >
                  <img src="./assets/img/sing-in.png" alt="google" />
                </a>
                <a
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(setting.apple_link, "_blank");
                  }}
                  className="pl-2"
                >
                  <img src="./assets/img/app-store.png" alt="apple" />
                </a>
              </div>
            </div>
          </Col>
          <Col lg={6} md={6}>
            <div className="banner_form">
              <h3>Get started for Free</h3>
              <p className="mb-4">
                App ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group controlId="formBasicEmail">
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
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
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
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
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
                        message: "Number should contain atleast 10 characters.",
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
                </Form.Group>
                <Form.Group controlId="exampleForm.ControlTextarea1">
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
                        message: "Message should contain atleast 3 characters.",
                      },
                    })}
                    helperText={errors.message && errors.message.message}
                  />
                </Form.Group>

                <Button title={"Send Message"} className={"btn btn-primary"} />
              </Form>
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

export default connect(null, mapDispatchToProps)(Home);
