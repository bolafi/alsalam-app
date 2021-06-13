import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Timing from "./Timing";
import booking from "../assets/booking-pitch.jpg";
import moment from "moment";
import leftArrow from "../assets/left-arrow-1.svg";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import "date-fns";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

const useStyle = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1rem",
    justifyContent: "center",
    alignItems: "center",
    height: "70%",
    margin: "2rem auto",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: " 1fr",
    },
    [theme.breakpoints.up("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
  },

  bookingInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    color: "#fff",
    textAlign: "right",
    marginRight: "2rem",
    [theme.breakpoints.down("sm")]: {
      margin: "auto",
      order: "2",
      alignItems: "center",
    },
  },
  mainTitle: {
    fontSize: "3rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
      textAlign: "center",
      margin: "0 auto",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2rem",
    },
  },
  subTitle: {
    fontSize: "1.2rem",
    marginLeft: "1rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
    },
  },
  avalibale: {
    display: "inline-block",
    border: "2px solid #fff",
    background: "#21acfa",
    color: "#fff",
    margin: "0 1rem",
    width: "80px",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      margin: "0.5rem",
      width: "60px",
    },
  },
  notAvalible: {
    display: "inline-block",
    border: "2px solid #fff",
    background: "#ddd",
    color: "#333",
    margin: "0 1rem",
    width: "80px",
    [theme.breakpoints.down("sm")]: {
      margin: "0.5rem",
      width: "60px",
    },
  },
  availability: {
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("sm")]: {
      alignItems: "center",
    },
  },
  calender: {
    color: "#fff",
    width: "25px",
    height: "25px",
    display: "inline-block",
    margin: "-0.2rem 0.5rem",
  },
  buttonStyle: {
    background: "#F43075",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontFamily: "Tajawal",
    marginLeft: "10px",
    marginTop: "1rem",
    width: "180px",
    height: "60px",
    fontWeight: "bold",
    "&:hover": {
      //you want this to be the same as the backgroundColor above
      backgroundColor: "#C5265E",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9rem",
      margin: "auto",
      width: "140px",
      height: "50px",
    },
  },
  arrow: {
    width: "30px",
    height: "30px",
    display: "inline-block",
    marginRight: "0.5rem",
    [theme.breakpoints.down("sm")]: {
      width: "18px",
      height: "18px",
    },
  },
  img: {
    display: "flex",
    justifyContent: "center",
  },
  bookingImg: {
    width: "80%",
    [theme.breakpoints.down("sm")]: {
      order: "1",
      width: "60%",
    },
  },
  note: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem",
    },
  },
  datePicker: {
    "& .MuiInputBase-root , .MuiButtonBase-root": {
      fontSize: "1.2rem",
      color: "#fff",
      [theme.breakpoints.down("sm")]: {
        fontSize: "0.9rem",
      },
    },
    "& .MuiInputBase-input": {
      // width: "50%",
    },
  },
}));

export default function BookingPage({ getInfo }) {
  const classes = useStyle();
  const [toCheckout, setToCheckout] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState([]);
  const [data, setData] = useState([]);
  const weekDayName = moment(selectedDate).format("dddd");

  const displayBookings = async (date) => {
    try {
      const data = await fetch("http://localhost:5000/api/bookings/all", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          selectedDate: moment(date).format("MM-DD-YYYY"),
        }),
      });
      const res = await data.json();
      const dbSlots = res.data.map((item) => item.timeSlot.slot).flat();
      setData(dbSlots);
      return res;
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    displayBookings(selectedDate);
  }, [selectedDate]);

  if (toCheckout) {
    return <Redirect to="/checkout" />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.bookingInfo}>
        <h2 className={classes.mainTitle}>معلومات عن الملعب</h2>
        <h3 className={classes.subTitle}>اسم الملعب : الملعب الشمالي</h3>
        <div>
          <h3 className={classes.subTitle}> : تاريخ الحجز</h3>
          <div className="">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                className={classes.datePicker}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                id="date-picker-inline"
                disablePast="true"
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <h3 className={`${classes.subTitle} ${classes.availability}`}>
          <span className={classes.notAvalible}>غير متاح</span>
          <span className={classes.avalibale}>متاح</span>
          :الوقت المتاح
        </h3>
        <Timing
          setTimeSlot={setTimeSlot}
          timeSlot={timeSlot}
          data={data}
          weekDayName={weekDayName}
        />
        <p className={classes.note}>
          ملاحظة: سعر الحجز في الفترة الصباحية 200 ريال والفترة المسائية 300
          ريال
        </p>
        <Button
          className={classes.buttonStyle}
          onClick={() => {
            getInfo({ timeSlot, selectedDate });
            {
              timeSlot.length > 0 && setToCheckout(true);
            }
          }}
        >
          <img src={leftArrow} className={classes.arrow} alt="" />
          متابعة الحجز
        </Button>
      </div>
      <div className={classes.img}>
        <img className={classes.bookingImg} src={booking} alt="" />
      </div>
    </div>
  );
}
