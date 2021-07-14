import React from "react"
import { Container, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Footer = () => {
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }))
  function closesidebar() {
    document.getElementById("onscroll").classList.remove("showsidebar")
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }
  return (
    <>
      <div onClick={closesidebar} className="overlay-blr"></div>
      <button id="gototop" title="Go to top" className="top-link-btn">
        <i className="fas fa-chevron-up"></i>
      </button>

      <footer className=" ">
        <Container fixed>
          <div className="footer-contant">
            <div className="copyright white-text">
              ©&nbsp;{new Date().getFullYear()}&nbsp;-&nbsp;
              <Link to="/" className="white-text">
                {setting.name}
              </Link>
              &nbsp; All rights reserved.
            </div>
          </div>
        </Container>
        <Button className="btn btn-primary top-scroll" onClick={scrollToTop}>
          <i className="fas fa-chevron-up"></i>Back to top
        </Button>
      </footer>
    </>
  )
}

export default Footer
