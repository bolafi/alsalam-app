import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Alert from "@material-ui/lab/Alert";
const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: "#C5265E",
  },
  tooltip: {
    backgroundColor: "#C5265E",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip placement="top" arrow classes={classes} {...props} />;
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 70px)",
    justifyContent: "center",
    gridGap: "0.5rem",
    direction: "rtl",
    marginTop: "2rem",
    marginBottom: "1rem",
    [theme.breakpoints.down("sm")]: {
      margin: "1rem",
    },
  },

  slot: {
    border: "2px solid #fff",
    background: "#03FC85",
    color: "#333",
    width: "75px",
    height: "75px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "0.3s ease",
    padding: "0.5rem ",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8rem",
      width: "60px",
      height: "60px",
    },
  },
  avaliableTiming: {
    background: "#21acfa",
    color: "#fff",
  },
  notAvaliableTiming: {
    background: "#ddd",
  },
  toggleButton: {
    background: "#0f0e17",
    borderColor: "#FFFFFE",
    color: "#fff",
  },
  alert: {
    fontFamily: "Tajawal",
    width: "90%",
    marginLeft: "7rem",
    direction: "rtl",
    justifyContent: "space-evenly",
    alignItems: "center",
    height: "4rem",
    fontSize: ".7rem",
    color: "#0f0e17",
    [theme.breakpoints.down("lg")]: {
      margin: "auto",
      fontSize: ".6rem",
      width: "90%",
      height: "3rem",
    },
  },
}));

const Timing = ({ setTimeSlot, timeSlot, data, weekDayName }) => {
  const classes = useStyle();

  const initialSlots = [
    {
      id: "1",
      time: "صباحا 8-10",
      price: 200,
      available: true,
      name: "first",
    },
    {
      id: "2",
      time: "صباحا 10-12",
      price: 200,
      available: true,
      name: "second",
    },
    {
      id: "3",
      time: "مساءا 12-2 ",
      price: 300,
      available: true,
      name: "third",
    },
    {
      id: "4",
      time: "مساءا 2-4 ",
      price: 300,
      available: true,
      name: "fourth",
    },
    {
      id: "5",
      time: "مساءا 4-6 ",
      price: 300,
      available: true,
      name: "fifth",
    },
    {
      id: "6",
      time: "مساءا 6-8 ",
      price: 300,
      available: true,
      name: "sixth",
    },
    {
      id: "7",
      time: "مساءا 8-10 ",
      price: 300,
      available: true,
      name: "seventh",
    },
    {
      id: "8",
      time: "مساءا 10-12 ",
      price: 300,
      available: true,
      name: "eighth",
    },
  ];
  const [slots, setSlots] = useState([...initialSlots]);
  const [notification, setNotification] = useState(false);

  // To check if there is booking on database or not
  const checkAvailabilty = () =>
    initialSlots.map((item) => {
      return data.some((i) => i.id === item.id)
        ? { ...item, available: false }
        : item;
    });

  // This function is to handle the toggling on solts
  const toggleSlot = (slot) => {
    if (!timeSlot.some((item) => item.name === slot.name)) {
      setTimeSlot([...timeSlot, slot]);
    } else {
      const newTimeSlots = timeSlot.filter((item) => item.name !== slot.name);
      setTimeSlot(newTimeSlots);
    }
  };

  // This function is to set the initinalSlots (the first 4 solts) to unavailable
  function disablingFridayTiming() {
    for (let i = 0; i < 4; i++) {
      initialSlots[i].available = false;
      setSlots([...initialSlots]);
    }
    setNotification(true);
  }

  useEffect(() => {
    function updateUI(bookingsArray) {
      // HERE IF THE DAY IS FRIDAY
      if (weekDayName === "Friday") {
        disablingFridayTiming();

        if (bookingsArray.length > 0) {
          const res = checkAvailabilty();
          setSlots(res);
        } else {
          setSlots([...initialSlots]);
        }
      } // HERE IF THE DAY IS NOT FRIDAY
      else {
        if (bookingsArray.length > 0) {
          const res = checkAvailabilty();
          setSlots(res);
          setNotification(false);
        } else {
          setSlots([...initialSlots]);
          setNotification(false);
        }
      }
    }
    updateUI(data);
  }, [data]);

  return (
    <>
      {notification && (
        <Alert variant="filled" className={classes.alert} severity="warning">
          <h3>أوقات الحجز في يوم الجمعة تبدأ من الرابعة عصرا</h3>
        </Alert>
      )}
      <div className={classes.root}>
        {slots &&
          slots.map((slot) => (
            <BootstrapTooltip key={slot.time} title={slot.price + " ريال"}>
              <div
                className={
                  slot.available
                    ? `${classes.slot} ${classes.avaliableTiming}`
                    : `${classes.slot} ${classes.notAvaliableTiming}`
                }
                onClick={(e) => {
                  if (slot.available) {
                    e.target.classList.toggle(classes.toggleButton);
                    toggleSlot(slot);
                  }
                }}
              >
                {slot.time}
              </div>
            </BootstrapTooltip>
          ))}
      </div>
    </>
  );
};

export default Timing;
