import React from "react";
import { Tooltip, Zoom, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { date } from "../../utils/helpers";
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp";

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

  const handleViewclick = (type) => {
    item.step = type;
    props.handleViewclick(item);
  };

  return (
    <>
      <tr key={item._id} className="itemListing">
        <td>
          <Chip
            avatar={<Avatar alt="Natacha" src={item.company.logo} />}
            label={item.company.name}
            variant="outlined"
          />
        </td>
        <th scope="row">{item.title}</th>
        <td>#{item.audit_number}</td>
        <td>{item.type}</td>
        <td>{item.status_view}</td>
        <td>{item.sign_type}</td>
        <td>{date(item.updated_at)}</td>
        <td>
          <Tooltip
            title="View"
            arrow
            placement="top"
            TransitionComponent={Zoom}
            onClick={() => handleViewclick("VIEW")}
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
        </td>
      </tr>
    </>
  );
};

export default List;
