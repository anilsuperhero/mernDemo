import React from "react"
import { useSelector } from "react-redux"
const View = () => {
  const user = useSelector((state) => state.userInfo)

  return (
    <>
      <div className="myaccount-left ">
        <div className="profile-outer">
          <figure>
            <img src={user.image} alt="profile" />
          </figure>
          <figcaption>
            <strong>{user.company_name}</strong>
            <p className="emaillink">{user.email}</p>
            <p className="contant-number">
              {user.first_name}&nbsp;{user.last_name}
            </p>
          </figcaption>
        </div>
      </div>
    </>
  )
}

export default View
