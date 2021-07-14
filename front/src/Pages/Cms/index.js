import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadPageData } from "../../actions/homePageActions";
import { Container } from "react-bootstrap";
import Breadcrumb from "../../Component/Breadcrumb";

const Index = (props) => {
  const slug = props.location.pathname;
  const dispatch = useDispatch();
  const { pageData } = useSelector((state) => ({
    pageData: state.pageData,
  }));

  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" };
    }
    return { __html: "" };
  };

  useEffect(() => {
    const fetchData = () => {
      dispatch(loadPageData(slug));
    };
    fetchData();
  }, [dispatch, slug]);

  return (
    <>
      <Breadcrumb {...props} />
      <section className="page-title green-bg">
        <Container>
          <div className="page-title-contant">
            <h2>{pageData.title}</h2>
          </div>
        </Container>
      </section>
      <section className="main-contant-wrapper">
        <Container>
          <div className="page-contant">
            <div
              className="about-page-text"
              dangerouslySetInnerHTML={prepareHtml(pageData.content)}
            ></div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Index;
