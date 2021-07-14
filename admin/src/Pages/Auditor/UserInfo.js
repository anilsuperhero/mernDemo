import React from "react"
import { Modal, Table } from "react-bootstrap"
import Avatar from "@material-ui/core/Avatar"
import Chip from "@material-ui/core/Chip"

const ViewDetails = (props) => {
  const { show, userInfo } = props

  const handleclickModel = (action) => {
    props.onHide(action)
  }

  return (
    <>
      <Modal
        show={show}
        size="lg"
        onHide={() => handleclickModel(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {userInfo.first_name}&nbsp;{userInfo.last_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <Chip
                    avatar={
                      <Avatar alt={userInfo.first_name} src={userInfo.image} />
                    }
                    label={userInfo.first_name + " " + userInfo.last_name}
                    variant="outlined"
                  />
                </td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userInfo.email}</td>
              </tr>
              <tr>
                <td>Number</td>
                <td>+44-{userInfo.number}</td>
              </tr>
              <tr>
                <td>Company Name</td>
                <td>{userInfo.username}</td>
              </tr>
              <tr>
                <td>Websit Link</td>
                <td>{userInfo.websit_link}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{userInfo.address}</td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ViewDetails
