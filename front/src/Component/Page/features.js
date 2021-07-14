import React from "react"
import { Container, Row, Col } from "react-bootstrap"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import Animate from "./animate"

const Features = (props) => {
  const { homePageData } = props
  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" }
    }
    return { __html: "" }
  }

  var settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 320,
        settings: { slidesToShow: 1, slidesToScroll: 6, infinite: false },
      },
      {
        breakpoint: 767,
        settings: { slidesToShow: 3, slidesToScroll: 6, infinite: false },
      },
      {
        breakpoint: 991,
        settings: { slidesToShow: 4, slidesToScroll: 2, infinite: false },
      },
    ],
  }
  return (
    <>
      {homePageData.features && (
        <section
          id="features"
          className="process_sec p-0"
          dangerouslySetInnerHTML={prepareHtml(
            homePageData.features.description
          )}
        ></section>
      )}

      <section className="app_sec">
        <Container>
          <div className="heading_sec text-center mb-3 mb-md-5">
            <h2 className="text-white">App Screenshot</h2>
            <div className="bar"></div>
          </div>
          <Row>
            <Col lg={12}>
              <Slider {...settings}>
                <div className="change">
                  <img src="./assets/img/app1.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app2.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app3.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app4.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app5.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app2.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app1.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app3.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app4.png" alt="app-screen" />
                </div>
                <div className="change">
                  <img src="./assets/img/app5.png" alt="app-screen" />
                </div>
              </Slider>
            </Col>
          </Row>
          <Animate />
        </Container>
      </section>
    </>
  )
}

export default Features
