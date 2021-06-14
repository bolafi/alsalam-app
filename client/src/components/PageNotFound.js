import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  notFound: {
    maxWidth: "750px",
    backgroundColor: "#fff",
    color: "#333",
    border: "5px solid #333",
    margin: "15rem auto 0 ",
    direction: "rtl",
    textAlign: "center",
    padding: "4rem 0",
    [theme.breakpoints.down("xs")]: {
      width: "300px",
      padding: "1rem",
    },
  },
  notFoundHeading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
  buttonStyle: {
    background: "linear-gradient(90deg, #21ACFA 6.47%, #0688D1 92.15%)",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1.2rem",
    fontFamily: "Tajawal",
    margin: "2rem",
    padding: "0.75rem 1.5rem",
    [theme.breakpoints.down("sm")]: {
      padding: "0.5rem 1.25rem",
      fontSize: "0.8rem",
    },
  },
}));

const PageNotFound = () => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div className={classes.notFound}>
      <h1 className={classes.notFoundHeading}>الصفحة غير موجودة </h1>
      <Button className={classes.buttonStyle} onClick={() => history.push("/")}>
        العودة الى الصفحة الرئيسية
      </Button>
    </div>
  );
};

export default PageNotFound;
