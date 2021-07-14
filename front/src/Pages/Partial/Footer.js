import React from "react"
import { Container, Button } from "@material-ui/core"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

const Footer = () => {
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }))
  return (
    <footer className="green-bg">
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
      <Button className="btn btn-primary top-scroll">
        <i className="fas fa-chevron-up"></i>Back to top
      </Button>
    </footer>
  )
}

export default Footer
