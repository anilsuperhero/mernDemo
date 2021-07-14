import React from "react"
import logo from "../../assets/img/seo.svg"
const NotFound = () => {
  return (
    <div className="text-center">
      <img src={logo} alt="notfound" className="p-5" height="200px" />
      <h3>Sorry we couldn't find any matches</h3>
      <span>
        Maybe your search was too specific, please try searching with another
        term
      </span>
    </div>
  )
}

export default NotFound
