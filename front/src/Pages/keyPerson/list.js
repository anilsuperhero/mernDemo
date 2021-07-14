import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Tooltip, Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

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
  const handleClick = (item, action) => {
    props.handleFormClick(item, action);
  };

  const handleDeleteClick = () => {
    props.handleDeleteClick(item);
  };

  const handleChangeViewClick = (item, action) => {
    props.handleViewClick(item, action);
  };

  return (
    <>
      <tr className="itemListing">
        <td>
          <Chip
            avatar={<Avatar src={item.image} />}
            label={item.first_name + " " + item.last_name + ""}
            variant="outlined"
          />
        </td>
        <td>{item.email}</td>
        <td>{item.mobile_number}</td>
        <td>{item.positionHeld}</td>
        <td>{item.type === "PERSONNEL" ? "Key Personnel" : "Key Staff"}</td>
        <td>{date(item.created_at)}</td>
        <td>
          <Tooltip
            title="Edit"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleClick(item, true)}
          >
            <Fab
              variant="extended"
              size="small"
              color="inherit"
              className={classes.margin}
            >
              <EditIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title="Delete"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={handleDeleteClick}
          >
            <Fab
              variant="extended"
              size="small"
              color="secondary"
              className={classes.margin}
            >
              <DeleteIcon fontSize="small" />
            </Fab>
          </Tooltip>
          <Tooltip
            title="View"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleChangeViewClick(item, true)}
          >
            <Fab
              variant="extended"
              size="small"
              color="primary"
              className={classes.margin}
            >
              <VisibilityIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

export default List;
