import { makeStyles } from "@material-ui/core/styles";

const useStyle = makeStyles((theme) => ({
  banner: {
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
  bannerHeading: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },
}));

const Banner = () => {
  const classes = useStyle();

  return (
    <div className={classes.banner}>
      <h1 className={classes.bannerHeading}>
        يجب عليك التسجيل للوصول إلى صفحة الحجز
      </h1>
    </div>
  );
};

export default Banner;
