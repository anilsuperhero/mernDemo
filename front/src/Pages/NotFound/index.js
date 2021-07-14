import React from "react";
import { NavLink } from "react-router-dom";
import { Container } from "react-bootstrap";
import Breadcrumb from "../../Component/Breadcrumb";

const Index = (props) => {
  return (
    <>
      <Breadcrumb {...props} />
      <section className="page-title green-bg">
        <Container>
          <div className="page-title-contant"></div>
        </Container>
      </section>
      <section className="main-contant-wrapper">
        <div>
          <div className="error">
            <div className="error__title">404</div>
            <div className="error__description">Page Not Found...</div>
            <NavLink to="/" className="error__button error__button--active">
              Back TO Home
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default Index;
