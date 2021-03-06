import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { Tooltip, Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { date } from "../../utils/helpers";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import LockOpenSharpIcon from "@material-ui/icons/LockOpenSharp";
import Switch from "../../Component/Switch";

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
  const handleclick = (item, action) => {
    props.handleFormClick(item, action);
  };
  const handleChangePasswordclick = (item, action) => {
    props.handlePasswordClick(item, action);
  };

  const [state, setState] = useState({
    status: item.status,
  });

  const handleChange = (params) => {
    props.handleSwitchClick(params);
    setState({
      ...props.item.status,
      [params.name]: params.status,
    });
  };

  const handleDeleteclick = () => {
    props.handleDeleteClick(item);
  };

  return (
    <>
      <tr key={state} className="itemListing">
        <td>
          <Chip
            avatar={<Avatar alt="Natacha" src={item.image} />}
            label={item.first_name + " " + item.last_name}
            variant="outlined"
          />
        </td>
        <td>{item.email}</td>
        <td>{item.mobile_number}</td>
        <td>{date(item.created_at)}</td>
        <td>
          <Switch item={item} onChange={handleChange} />
          <Tooltip
            title="Edit"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleclick(item, true)}
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
            onClick={handleDeleteclick}
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
            title="Change Password"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleChangePasswordclick(item, true)}
          >
            <Fab
              variant="extended"
              size="small"
              color="primary"
              className={classes.margin}
            >
              <LockOpenSharpIcon fontSize="small" />
            </Fab>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

export default List;
