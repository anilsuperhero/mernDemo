import React from "react";
import { Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import MoreVertIcon from "@material-ui/icons/MoreVert";

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
  const classes = useStyles();

  const handleChangeActionClick = () => {
    props.handleActionClick(item);
  };

  return (
    <>
      <tr className="itemListing">
        <td>{item.title}</td>
        <td>#{item.audit_number}</td>
        <td>{item.type}</td>
        <td>{item.status_view}</td>
        <td>{date(item.created_at)}</td>
        <td>{date(item.updated_at)}</td>
        <td>
          <Fab
            variant="extended"
            size="small"
            className={classes.margin}
            onClick={handleChangeActionClick}
          >
            <MoreVertIcon fontSize="small" />
          </Fab>
        </td>
      </tr>
    </>
  );
};

export default List;
