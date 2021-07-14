import { Fab, Tooltip, Zoom } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CurrencyFormat from "react-currency-format";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import React, { Fragment } from "react";
import { date } from "../../utils/helpers";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const List = (props) => {
  const { item } = props;
  const { REACT_APP_CURRENCY } = process.env;
  const REACT_APP_CURRENCY_SHOW = REACT_APP_CURRENCY || "$";
  const classes = useStyles();
  const handleViewclick = () => {
    props.handleViewclick(item);
  };

  const handleDownloadclick = () => {
    props.handleDownloadclick(item);
  };

  return (
    <Fragment>
      <tr className="itemListing">
        <th scope="row">#{item.reciptNumber}</th>
        <td>
          <CurrencyFormat
            value={item.amount}
            displayType={"text"}
            thousandSeparator={true}
            prefix={REACT_APP_CURRENCY_SHOW}
          />
        </td>
        <th scope="row">
          {item.audits.title}
          <br />#{item.audits.audit_number}
          <br />
          {item.audits.type}
        </th>
        <th scope="row">
          {item.paymentId ? (
            <Fragment>
              #{item.paymentId}
              <br />
              {item.transactionType}
            </Fragment>
          ) : (
            <Fragment>
              {item.remarks}
              <br />
              {item.transactionType}
            </Fragment>
          )}
        </th>
        <td>{date(item.created_at)}</td>
        <td>
          <Tooltip
            title="View Receipt"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleViewclick}
          >
            <Fab
              variant="extended"
              size="small"
              color="inherit"
              className={classes.margin}
            >
              <VisibilitySharpIcon fontSize="small" />
            </Fab>
          </Tooltip>

          <Tooltip
            title="Download Receipt"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleDownloadclick}
          >
            <Fab
              variant="extended"
              size="small"
              color="primary"
              className={classes.margin}
            >
              <CloudDownloadIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </td>
      </tr>
    </Fragment>
  );
};

export default List;
