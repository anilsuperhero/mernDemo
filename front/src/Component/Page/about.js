import React from "react"
const About = (props) => {
  const { homePageData } = props
  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" }
    }
    return { __html: "" }
  }
  return (
    <>
      {homePageData.why && (
        <section
          id="why-us"
          dangerouslySetInnerHTML={prepareHtml(homePageData.why.description)}
        ></section>
      )}
    </>
  )
}

export default About
