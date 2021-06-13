import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import avatar from "../assets/user2.svg";
import MyBookings from "./MyBookings";
import moment from "moment";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "space-around",
    width: "90%",
    margin: "5rem auto",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column-reverse",
      margin: "2rem auto",
      width: "100%",
    },
    [theme.breakpoints.up("lg")]: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  myBookings: {
    flex: "2",
    marginRight: "2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",

    [theme.breakpoints.down("xs")]: {
      margin: "0 auto",
      width: "100%",
    },
  },
  myInfo: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    padding: "0.5rem",
    direction: "rtl",
    [theme.breakpoints.down("xs")]: {
      marginBottom: "1rem",
    },
    [theme.breakpoints.up("lg")]: {
      height: "550px",
      padding: "1rem",
    },
  },
  card: {
    background: "#333",
    color: "#fff",
    borderRadius: "5px",
    border: "5px solid #fff",
    [theme.breakpoints.down("xs")]: {
      border: "2px solid #fff",
    },
    [theme.breakpoints.up("sm")]: {
      border: "3px solid #fff",
      margin: "1rem",
    },
  },
  user: {
    width: "100px",
    height: "100px",
    color: "#fff",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      width: "50px",
      height: "50px",
    },
  },
  title: {
    fontSize: "2rem",
    marginBottom: "2rem",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.8rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  },
  subTitle: {
    fontSize: "1.2rem",
    margin: "1rem 0",
    textAlign: "right",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
  info: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
}));

export default function MyProfile({ user }) {
  const classes = useStyle();

  return (
    <div className={classes.root}>
      <div className={`${classes.card} ${classes.myBookings}`}>
        <h1 className={classes.title}>حجوزاتي</h1>
        {user && <MyBookings bookingData={user.bookings} />}
      </div>
      <div className={`${classes.card} ${classes.myInfo}`}>
        <h1 className={classes.title}>المعلومات الشخصية</h1>
        <img className={classes.user} src={avatar} alt="" />
        <div className={classes.info}>
          <h3 className={classes.subTitle}>الاسم : {user && user.name}</h3>
          <h3 className={classes.subTitle}>الايميل : {user && user.email}</h3>
          <h3 className={classes.subTitle}>
            رقم الجوال : {user && user.phone}
          </h3>
          <h3 className={classes.subTitle}>
            مشترك منذ : {user && moment(user.date).format("DD-MM-YYYY")}
          </h3>
        </div>
      </div>
    </div>
  );
}
