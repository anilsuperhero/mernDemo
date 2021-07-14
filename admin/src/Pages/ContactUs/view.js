import React from "react"
import { Modal } from "react-bootstrap"
import { withStyles } from "@material-ui/core/styles"
import { Table, TableBody, TableCell, TableContainer } from "@material-ui/core"
import TableRow from "@material-ui/core/TableRow"

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow)

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

const View = (props) => {
  const { contactdetail } = props
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {contactdetail.first_name}&nbsp;{contactdetail.last_name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <TableContainer>
          <Table aria-label="customized table">
            <TableBody>
              <StyledTableRow key="0">
                <StyledTableCell component="th" scope="row">
                  First Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {contactdetail.first_name}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow key="1">
                <StyledTableCell component="th" scope="row">
                  Last Name
                </StyledTableCell>
                <StyledTableCell align="left">
                  {contactdetail.last_name}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow key="2">
                <StyledTableCell component="th" scope="row">
                  Email Address
                </StyledTableCell>
                <StyledTableCell align="left">
                  {contactdetail.email}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow key="3">
                <StyledTableCell component="th" scope="row">
                  Number
                </StyledTableCell>
                <StyledTableCell align="left">
                  {contactdetail.mobile_number}
                </StyledTableCell>
              </StyledTableRow>
              <StyledTableRow key="3">
                <StyledTableCell component="th" scope="row">
                  Message
                </StyledTableCell>
                <StyledTableCell align="left">
                  {contactdetail.message}
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Modal.Body>
    </Modal>
  )
}

export default View
