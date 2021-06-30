import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

// This Dialog is the Customized dialog From Material UI

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: "#fff",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const useStyles = makeStyles((theme) => ({
  container: {
    color: "#fff",
    background: "#333",
    border: "4px dashed #fff",
    width: "400px",
    minHeight: "200px",
    fontFamily: "Tajawal",
    direction: "rtl",
    [theme.breakpoints.down("xs")]: {
      border: "2px dashed #fff",
      width: "300px",
    },
  },
  title: {
    textAlign: "center",
    padding: "1rem 0",
    "& .MuiTypography-h6": {
      fontFamily: "Tajawal",
      fontSize: "2rem ",
      fontWeight: "bold",
      [theme.breakpoints.down("xs")]: {
        padding: "0.5rem",
        fontSize: "1.6rem ",
      },
    },
  },
  content: {
    textAlign: "center",
    fontSize: "1.6rem ",
    fontWeight: "bold",
    padding: "1rem ",
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
      fontSize: "1.3rem ",
    },
  },
  email: {
    margin: "1rem",
    fontSize: "2rem",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.3rem",
    },
  },
}));

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    fontSize: "1rem",
  },
}))(MuiDialogContent);

export default function Conformation({ showDialog, getEmail, error }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { email } = getEmail;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        {error ? (
          <div className={classes.container}>
            <DialogTitle
              className={classes.title}
              id="customized-dialog-title"
              onClose={handleClose}
            >
              الحجز غير متوفر
            </DialogTitle>
            <DialogContent className={classes.content}>
              الرجاء الاختيار من الاوقات المتاحة
            </DialogContent>
          </div>
        ) : (
          <div className={classes.container}>
            <DialogTitle
              className={classes.title}
              id="customized-dialog-title"
              onClose={handleClose}
            >
              تم الحجز
            </DialogTitle>
            <DialogContent className={classes.content}>
              تم إرسال التأكيد الى بريدك الالكتروني
              <p className={classes.email}>{email}</p>
            </DialogContent>
          </div>
        )}
      </Dialog>
    </div>
  );
}
