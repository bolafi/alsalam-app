import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { AppBar, Toolbar, Button, IconButton } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import logo from "../assets/flag.svg";
import { Link, useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "8vh",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Tajawal",
  },
  appBar: {
    background:
      "linear-gradient(180deg, #333333 0.50%, rgba(51, 51, 51, 0) 79.73%)",
    padding: "1rem 0",
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem 1.25rem",
      fontSize: "1rem",
    },
  },
  appBarWrapper: {
    width: "1200px",
    maxWidth: "80%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      maxWidth: "100%",
      background: "rgba(0,0,0,.85)",
      position: "absolute",
      top: " -300px",
      left: "0",
      right: "0",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: ".5rem 2rem",
      width: "100%",
      transition: "all .3s ease-in-out",
      borderBottom: " 3px solid #333",
      opacity: "1",
    },
    [theme.breakpoints.up("sm")]: {
      maxWidth: "100%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "90%",
    },
  },
  imageIcon: {
    height: "50px",
    width: "50px",
    alignSelf: "end",
    [theme.breakpoints.down("xs")]: {
      alignSelf: "center",
    },
  },
  buttons: {
    [theme.breakpoints.down("xs")]: {
      padding: "0.5rem 1.25rem",
      fontSize: "1rem",
      display: "flex",
      flexDirection: "column",
      order: "2",
    },
  },
  buttonStyle: {
    background: " #21ACFA ",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontFamily: "Tajawal",
    marginLeft: "10px",
    transition: "all 0.5s ease",
    "&:hover": {
      background: "#1A8ACA",
    },
    [theme.breakpoints.up("xs")]: {
      padding: "0.5rem 1.25rem",
      fontSize: "1rem",
      marginTop: "8px",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.8rem",
      padding: "0.5rem ",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
      padding: "0.5rem 0.75rem",
    },
  },
  links: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.up("xs")]: {
      flexDirection: "column-reverse",
      order: "1",
    },
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
    [theme.breakpoints.up("md")]: {
      justifyContent: "space-evenly",
    },
    [theme.breakpoints.up("lg")]: {
      justifyContent: "space-between",
    },
  },
  link: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1.2rem",
    display: "inline-block",
    margin: "0 3rem",
    fontWeight: "bold",
    direction: "rtl",
    [theme.breakpoints.up("xs")]: {
      padding: "0.5rem 1.25rem",
      fontSize: "1rem",
      margin: "8px 0",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "0.8rem",
      margin: "0 0.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "1rem",
      margin: "0 2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.2rem",
      margin: "0 3rem",
    },
  },
  user: {
    color: "#C5265E",
  },
  menuButton: {
    marginRight: theme.spacing(2),
    alignSelf: "flex-start",
    opacity: "0",
    display: "none",
    [theme.breakpoints.down("xs")]: {
      display: "inline",
      opacity: "1",
      zIndex: "2",
    },
  },
  show: {
    opacity: "1",
    top: "0",
  },
}));
export default function Header({ user, loggedIn, logoutUser }) {
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [show, setShow] = useState(false);
  const clickme = () => {
    setShow(!show);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} elevation={0}>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
          onClick={clickme}
        >
          <MenuIcon />
        </IconButton>
        <Toolbar
          className={
            show
              ? `${classes.appBarWrapper} ${classes.show}`
              : classes.appBarWrapper
          }
        >
          <div className={classes.buttons}>
            {location.pathname === "/signup" ? (
              <Button
                className={classes.buttonStyle}
                onClick={() => {
                  history.push("/login");
                  setShow(false);
                }}
              >
                تسجيل الدخول
              </Button>
            ) : location.pathname === "/login" ? (
              <Button
                className={classes.buttonStyle}
                onClick={() => {
                  history.push("/signup");
                  setShow(false);
                }}
              >
                تسجيل حساب جديد
              </Button>
            ) : (
              <>
                <Button
                  className={classes.buttonStyle}
                  onClick={
                    user
                      ? () => logoutUser()
                      : () => {
                          history.push("/login");
                          setShow(false);
                        }
                  }
                >
                  {user ? "تسجيل الخروج" : "تسجيل الدخول"}
                </Button>
                {!user && (
                  <Button
                    className={classes.buttonStyle}
                    onClick={() => {
                      history.push("/signup");
                      setShow(false);
                    }}
                  >
                    تسجيل حساب جديد
                  </Button>
                )}
              </>
            )}
          </div>

          <div className={classes.links}>
            {user && (
              <Link
                to="/profile"
                onClick={() => setShow(false)}
                className={`${classes.link} ${classes.user}`}
              >
                مرحبا بك {user.name}
              </Link>
            )}
            <Link
              to="/whoAreWe"
              className={classes.link}
              onClick={() => setShow(false)}
            >
              من نحن
            </Link>
            <Link
              to="/"
              className={classes.link}
              onClick={() => setShow(false)}
            >
              الرئيسية
            </Link>
            <img className={classes.imageIcon} src={logo} alt="" />
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
