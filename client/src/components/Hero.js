import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import Features from "./Features";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    fontFamily: "Tajawal",
    padding: "3rem 0",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "nowrap",
      flexDirection: "column",
    },
  },
  mainTitle: {
    fontSize: "4rem",
    fontWeight: "bold",
    color: "#fff",
    direction: "rtl",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
      marginTop: "0",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "4rem",
    },
  },
  subTitle: {
    fontSize: "3rem",
    color: "#03FC85",
    direction: "rtl",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.7rem",
      marginTop: "0",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.3rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3rem",
    },
  },
  buttonStyle: {
    background: " #21ACFA ",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontFamily: "Tajawal",
    marginLeft: "10px",
    width: "160px",
    transition: "all 0.5s ease",
    "&:hover": {
      background: "#1A8ACA",
    },
  },
}));
export default function Hero() {
  const history = useHistory();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <h1 className={classes.mainTitle}>مرحبا بكم في ملاعب السلام</h1>
      <h1 className={classes.subTitle}>بماذا تمتاز ملاعبنا</h1>
      <Features />
      <Button
        className={classes.buttonStyle}
        onClick={() => history.push("/booking")}
      >
        تحقق التوافر
      </Button>
    </div>
  );
}
