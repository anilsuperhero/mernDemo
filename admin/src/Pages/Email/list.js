import React from "react"
import { Tooltip, Zoom, Fab } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"
import { makeStyles } from "@material-ui/core/styles"
import { date } from "../../utils/helpers"

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
  const handleclick = (item, action) => {
    props.handleFormClick(item, action)
  }

  return (
    <>
      <tr className="itemListing">
        <th scope="row">{item.title}</th>
        <td>{item.subject}</td>
        <td>{date(item.updated_at)}</td>
        <td>
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
        </td>
      </tr>
    </>
  )
}

export default List
