import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import lights from "../assets/lights.jpeg";
import calender from "../assets/calender.webp";
import facilities from "../assets/facilities.jpg";
import pitch from "../assets/natural-pitch.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    [theme.breakpoints.down("xs")]: {
      flexWrap: "nowrap",
      flexDirection: "column",
    },
    [theme.breakpoints.up("sm")]: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.up("lg")]: {
      gridTemplateColumns: "repeat(4, 1fr)",
    },
  },
  imgStyle: {
    width: "160px",
    height: "160px",
    borderRadius: "50%",
    marginBottom: "0.5rem",
    [theme.breakpoints.down("xs")]: {
      width: "60px",
      height: "60px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "150px",
      height: "150px",
    },
  },
  item: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.80rem",
    },
  },
}));
export default function Features() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.item}>
        <img className={classes.imgStyle} src={pitch} alt="" />
        <h3>أرضيات عشبية طبيعية</h3>
      </div>
      <div className={classes.item}>
        <img className={classes.imgStyle} src={facilities} alt="" />
        <h3>مرافق حديثة</h3>
      </div>
      <div className={classes.item}>
        <img className={classes.imgStyle} src={lights} alt="" />
        <h3>أنظمة إضاءة متطورة</h3>
      </div>
      <div className={classes.item}>
        <img className={classes.imgStyle} src={calender} alt="" />
        <h3>مرونة في التحكم بالحجز</h3>
      </div>
    </div>
  );
}
