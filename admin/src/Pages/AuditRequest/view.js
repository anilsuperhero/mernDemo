import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { date } from "../../utils/helpers";
import { Table } from "react-bootstrap";
import PDFView from "./pdfViewer";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

export default function View(props) {
  const handleClose = () => {
    props.handleClose();
  };

  const { open, detail } = props;
  const [item] = useState(detail);
  const [pdfUrl, setPdfUrl] = useState();
  const [viewPdf, setPdfViewer] = useState(false);
  const fileView = (type) => {
    if (type === "INVOICE") {
      setPdfUrl(item.invoice_document);
    } else {
      setPdfUrl(item.sla_document);
    }
    setPdfViewer(true);
  };

  const handleClosePDFView = () => {
    setPdfViewer(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth={true}
        maxWidth={"md"}
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {item.title}&nbsp;(#{item.audit_number})
        </DialogTitle>
        <DialogContent dividers>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>
                  <strong className="font-weight-bold">Title</strong>
                </td>
                <td>{item.title}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Audit Number</strong>
                </td>
                <td>#{item.audit_number}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">SLA Document</strong>
                </td>
                <td>
                  <strong
                    className="font-weight-bold file_name"
                    onClick={() => fileView("SLA")}
                  >
                    {item.sla_document_name}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Invoice</strong>
                </td>
                <td>
                  <strong
                    className="font-weight-bold file_name"
                    onClick={() => fileView("INVOICE")}
                  >
                    {item.invoice_document_name}
                  </strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Invoice Number</strong>
                </td>
                <td>#{item.invoice_number}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Type</strong>
                </td>
                <td>{item.type}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Size Of Company</strong>
                </td>
                <td>{item.size_of_company}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">
                    Number of participants / Clients
                  </strong>
                </td>
                <td>{item.number_of_clients}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Created At</strong>
                </td>
                <td>{date(item.created_at)}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Updated At</strong>
                </td>
                <td>{date(item.updated_at)}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">
                    Number of participants / Clients
                  </strong>
                </td>
                <td>{item.number_of_clients}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Remarks</strong>
                </td>
                <td>{item.remarks ? item.remarks : "N/A"}</td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">Company Details</strong>
                </td>
                <td>
                  <ul className="list-unstyled">
                    <li>
                      <strong className="font-weight-bold pr-2">Name:</strong>
                      &nbsp;
                      {item.company.name}
                    </li>
                    <li>
                      <strong className="font-weight-bold pr-2">
                        Abn Number:
                      </strong>
                      &nbsp;{item.company.abn_number}
                    </li>
                  </ul>
                </td>
              </tr>
              <tr>
                <td>
                  <strong className="font-weight-bold">
                    Registration Groups
                  </strong>
                </td>
                <td>
                  <ul className="list-group">
                    {item.registration_group &&
                      item.registration_group.map((item, key) => (
                        <li className="list-group-item" key={key}>
                          {item.title}
                        </li>
                      ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </DialogContent>
      </Dialog>
      {viewPdf && (
        <PDFView
          open={viewPdf}
          handleClose={handleClosePDFView}
          detail={pdfUrl}
        />
      )}
    </div>
  );
}
