import React from "react"
import Switch from "@material-ui/core/Switch"
import { withStyles } from "@material-ui/core/styles"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import { Tooltip, Zoom } from "@material-ui/core"

const Index = (props) => {
  const { item } = props

  const IOSSwitch = withStyles((theme) => ({
    root: {
      width: 42,
      height: 26,
      padding: 0,
      margin: 0,
    },
    switchBase: {
      padding: 1,
      "&$checked": {
        transform: "translateX(16px)",
        color: theme.palette.common.white,
        "& + $track": {
          backgroundColor: "#87c846",
          opacity: 1,
          border: "none",
        },
      },
      "&$focusVisible $thumb": {
        color: "#87c846",
        border: "6px solid #87c846",
      },
    },
    thumb: {
      width: 24,
      height: 24,
    },
    track: {
      borderRadius: 26 / 2,
      border: `1px solid ${theme.palette.error.dark[400]}`,
      backgroundColor: theme.palette.error.dark[50],
      opacity: 1,
      transition: theme.transitions.create(["background-color", "border"]),
    },
    checked: {},
    focusVisible: {},
  }))(({ classes, ...props }) => {
    return (
      <Tooltip
        title="Change Status"
        arrow
        placement="top"
        TransitionComponent={Zoom}
      >
        <Switch
          focusVisibleClassName={classes.focusVisible}
          disableRipple
          classes={{
            root: classes.root,
            switchBase: classes.switchBase,
            thumb: classes.thumb,
            track: classes.track,
            checked: classes.checked,
          }}
          {...props}
        />
      </Tooltip>
    )
  })

  const handleChange = (event) => {
    let params = item
    params.status = event.target.checked
    params.statusTitle = event.target.name
    props.onChange(params)
  }

  return (
    <FormControlLabel
      control={
        <IOSSwitch
          checked={item.status}
          onChange={handleChange}
          name="status"
        />
      }
    />
  )
}

export default Index
