import React, { useState } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"
import { makeStyles } from "@material-ui/core/styles"
import { useSelector, useDispatch } from "react-redux"
import { loadTosterData } from "../../actions/baseActions"
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function Toaster() {
  const classes = useStyles()
  const [state] = useState({
    vertical: "top",
    horizontal: "right",
  })
  const { vertical, horizontal } = state
  const { toaster } = useSelector((state) => ({
    toaster: state.toaster,
  }))
  const dispatch = useDispatch()
  const handleClose = () => {
    toaster.open = false
    dispatch(loadTosterData(toaster))
  }

  return (
    <div className={classes.root}>
      <Snackbar
        open={toaster.open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
      >
        <Alert onClose={handleClose} severity={toaster.severity}>
          {toaster.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
