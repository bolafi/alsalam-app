import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import Cookies from "js-cookie";
import moment from "moment";
import { Redirect } from "react-router-dom";
import { useState } from "react";
import Conformation from "./Conformation";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "3rem auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkout: {
    width: "750px",
    backgroundColor: "#fff",
    color: "#333",
    border: "5px solid #333",
    margin: "1rem 0 ",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem",
      width: "330px",
    },
    [theme.breakpoints.up("sm")]: {
      width: "400px",
    },

    [theme.breakpoints.up("md")]: {
      width: "550px",
    },
    [theme.breakpoints.up("lg")]: {
      width: "750px",
    },
  },
  buttonStyle: {
    background: " #21ACFA ",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontFamily: "Tajawal",
    margin: "2rem",
    padding: "0.75rem 1.5rem",
    transition: "all 0.5s ease",
    "&:hover": {
      background: "#1A8ACA",
    },
  },
  mainTitle: {
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "0",
    alignSelf: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.7rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.5rem",
    },
  },
  subTitle: {
    fontSize: "1.4rem",
    margin: "0.5rem 2rem",
    padding: "0.5rem",
    direction: "rtl",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
      margin: "0.5rem auto",
      textAlign: "right",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1.5rem",
    },
  },
}));

// FUNCTION TO CALCULATE THE BOOKING PRICE
const getTotalPayment = (arr) => {
  return arr.reduce((total, amount) => total + amount);
};

export default function Checkout({ bookingInfo, user, forceFetch }) {
  const classes = useStyle();
  const [conform, setConform] = useState(false);
  const [error, setError] = useState(false);
  const { timeSlot, selectedDate } = bookingInfo;

  // Function to create Booking
  const createBooking = async (book) => {
    try {
      if (Cookies.get("token")) {
        const { token: clientToken } = JSON.parse(Cookies.get("token"));
        const data = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: clientToken,
          },
          body: JSON.stringify(book),
        });
        const res = await data.json();

        if (res.msg === "Token is not valid") {
          return;
        } else if (res.msg === "Slot is already booked") {
          return setError(true);
        }

        setConform(true);
        // Force Fetch
        forceFetch();
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!timeSlot) {
    return <Redirect to="/" />;
  }

  // This function to handle on click on "تاكيد الحجز"
  const confirmBooking = async () => {
    await createBooking({
      selectedDate: moment(selectedDate).format("MM-DD-YYYY"),
      timeSlot: time,
    });
  };

  // To extract the name of booking {first, second ...} from timeSlot
  const time = timeSlot.map((slot) => slot.name);

  // Creating New Array of booking price
  const bookingPrice = timeSlot.map((slot) => slot.price);

  return (
    <div className={classes.root}>
      <div className={classes.checkout}>
        <h1 className={classes.mainTitle}>معلومات عن الحجز</h1>
        <h3 className={classes.subTitle}>اسم المستاجر : {user && user.name}</h3>
        <h3 className={classes.subTitle}>
          سعر الحجز : {getTotalPayment(bookingPrice)} ريال
        </h3>
        <h3 className={classes.subTitle}>اسم الملعب : الملعب الشمالي</h3>
        <h3 className={classes.subTitle}>
          وقت الحجز :
          {timeSlot.map((slot) => {
            if (timeSlot.length > 1) {
              return " || " + slot.time;
            } else {
              return slot.time;
            }
          })}
        </h3>
        <h3 className={classes.subTitle}>
          تاريخ الحجز :{moment(selectedDate).format("DD-MM-YYYY")}
        </h3>
      </div>
      {!conform && (
        <Button
          onClick={() => confirmBooking()}
          className={classes.buttonStyle}
        >
          تأكيد الحجز
        </Button>
      )}
      {conform && <Conformation showDialog={conform} getEmail={user} />}
      {error && <Conformation error showDialog={conform} getEmail={user} />}
    </div>
  );
}
