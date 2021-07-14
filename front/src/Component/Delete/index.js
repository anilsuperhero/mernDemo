import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { useSelector, useDispatch } from "react-redux"
import { loadDialogData } from "../../actions/baseActions"
import { toUcFirst } from "../../utils/helpers"

export default function AlertDialog(props) {
  const dispatch = useDispatch()
  const { dialog } = props
  const { dialogOpen } = useSelector((state) => ({
    dialogOpen: state.dialogOpen,
  }))

  const handleClose = (action) => {
    dispatch(loadDialogData(false))
    if (action) {
      dialog.action = true
      props.handleDeleteClick(dialog)
    }
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{dialog.dialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {dialog.message}
            {dialog.title && (
              <>
                "<b>{toUcFirst(dialog.title)}</b>"
              </>
            )}{" "}
            ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => handleClose(true)}
            color="primary"
            autoFocus
            variant="contained"
          >
            Yes
          </Button>
          <Button
            onClick={() => handleClose(false)}
            color="secondary"
            variant="contained"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
