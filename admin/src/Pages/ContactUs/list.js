import React from "react"
import { Tooltip, Zoom, Fab } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import { date } from "../../utils/helpers"
import DeleteIcon from "@material-ui/icons/Delete"
import VisibilitySharpIcon from "@material-ui/icons/VisibilitySharp"
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}))

const List = (props) => {
  const { item } = props
  const classes = useStyles()

  const handleDeleteclick = () => {
    props.handleDeleteClick(item)
  }

  const handleViewclick = () => {
    props.handleViewclick(item)
  }

  return (
    <>
      <tr key={item._id} className="itemListing">
        <th scope="row">
          {item.first_name}&nbsp;{item.last_name}
        </th>
        <td>{item.email}</td>
        <td>{item.mobile_number}</td>
        <td>{date(item.updated_at)}</td>
        <td>
          <Tooltip
            title="View"
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
        </td>
      </tr>
    </>
  )
}

export default List
