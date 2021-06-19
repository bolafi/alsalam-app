import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Header from "./components/Header";
import MyProfile from "./components/MyProfile";
import BookingPage from "./components/BookingPage";
import { Route, Switch, useHistory } from "react-router-dom";
import Hero from "./components/Hero";
import Checkout from "./components/Checkout";
import Signup from "./components/SignUp";
import Login from "./components/Login";
import WhoAreWe from "./components/WhoAreWe";
import Promo from "./components/Promo";
import bg from "./assets/field2.jpg";
import Cookies from "js-cookie";
import PrivateRoute from "./components/PrivateRoute";
import PageNotFound from "./components/PageNotFound";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh",
    backgroundImage: `linear-gradient(180deg, rgba(0, 60, 32, 0.7) 5%, rgba(0, 60, 32, 0.7) 100%),url(${bg})`,
    backgroundColor: "#333",
    fontFamily: "Tajawal",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  container: {
    width: "1200px",
    maxWidth: "80%",
    margin: "0 auto",
    overflow: "hidden",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
      maxWidth: "90%",
    },
  },
}));

export default function App() {
  const classes = useStyles();

  const [info, setInfo] = useState({ selectedDate: null, bookInfo: [] });
  const [user, setUser] = useState();
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useHistory();

  const checkUser = async () => {
    try {
      if (Cookies.get("token")) {
        const { token: clientToken } = JSON.parse(Cookies.get("token"));
        const data = await fetch("/api/auth", {
          method: "GET",
          headers: {
            Authorization: clientToken,
          },
        });
        const res = await data.json();
        if (res.msg === "Token is not valid") {
          return;
        }

        setLoggedIn(true);
        setUser(res);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const logoutUser = () => {
    Cookies.remove("token");
    setLoggedIn(false);
    setUser(null);
    history.push("/");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <CssBaseline />
        <Header user={user} loggedIn={loggedIn} logoutUser={logoutUser} />
        <Switch>
          <Route
            path="/signup"
            render={(props) => <Signup {...props} checkUser={checkUser} />}
          />
          <Route
            path="/login"
            render={(props) => <Login {...props} checkUser={checkUser} />}
          />
          <Route path="/whoarewe" component={WhoAreWe} />
          <Route path="/promo" component={Promo} />
          <Route exact path="/" component={Hero} />
          <PrivateRoute
            component={MyProfile}
            path="/profile"
            exact
            loggedIn={loggedIn}
            user={user}
          />
          <PrivateRoute
            component={BookingPage}
            loggedIn={loggedIn}
            getInfo={setInfo}
            path="/booking"
            exact
          />
          <PrivateRoute
            component={MyProfile}
            loggedIn={loggedIn}
            user={user}
            path="/profile"
            exact
          />
          <PrivateRoute
            component={Checkout}
            path="/checkout"
            exact
            loggedIn={loggedIn}
            bookingInfo={info}
            user={user}
            forceFetch={checkUser}
          />
          <Route path="/*" component={PageNotFound} />
        </Switch>
      </div>
    </div>
  );
}
