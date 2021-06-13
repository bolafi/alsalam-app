import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { FaEnvelope, FaPhone, FaMapMarkedAlt } from "react-icons/fa";

const useStyle = makeStyles((theme) => ({
  root: {
    margin: "2rem auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  checkout: {
    maxWidth: "750px",
    backgroundColor: "#fff",
    color: "#333",
    border: "5px solid #333",
    margin: "1rem 0 ",
    direction: "rtl",
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
      fontSize: "1rem",
    },
  },
  mainTitle: {
    fontSize: "3rem",
    textAlign: "center",
    marginBottom: "1.5rem",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "3rem",
    },
  },
  subTitle: {
    fontSize: "1.4rem",
    margin: "0.5rem 2rem",
    padding: "0.5rem",
    textAlign: "right",
    lineHeight: "2.2",
    position: "relative",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "1.2rem",
    },
    [theme.breakpoints.up("lg")]: {
      fontSize: "1.5rem",
    },
  },
  headline: {
    fontSize: "1.7rem",
    margin: "0.5rem 2rem",
    padding: "0.5rem",
    textAlign: "justify",
    lineHeight: "2.2",
    color: "crimson",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  },
  sperator: {
    borderBottom: "5px dashed lightgray",
    padding: "0.5rem",
    margin: "0.5rem 2rem",
  },
  qColor: {
    color: "dodgerblue",
  },
  icon: {
    fontSize: "3rem",
    color: "dodgerblue",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1.7rem",
    },
  },
  contact: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    margin: "0.5rem 2rem",
  },
}));

const WhoAreWe = () => {
  const classes = useStyle();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <div className={classes.checkout}>
        <h1 className={classes.mainTitle}> ملاعب السلام</h1>
        <h3 className={classes.subTitle}>
          نحن شركة رياضية قطرية متخصصة في تقديم كافة الخدمات الرياضية المتعلقة
          بالمرافق الرياضية من حجز ملاعب الى إعداد الاعبين بدنيا عن طريق الصالة
          الرياضية وأيضا بمايتعلق بتدريب الجيل الناشئ ممايجعلهم قادرين على
          الالتحاق بالاندية
        </h3>
        <div className={classes.sperator}></div>
        <h2 className={classes.headline}>الاسئلة الشائعة</h2>
        <h3 className={`${classes.subTitle} ${classes.qColor}`}>
          هل يجب أن أكون مشترك في الموقع لكي احجز ملعب ؟
        </h3>
        <h3 className={classes.subTitle}>نعم يجب عليك التسجيل فالموقع أولا</h3>
        <h3 className={`${classes.subTitle} ${classes.qColor}`}>
          ماهي طريقة الدفع للحجز؟
        </h3>
        <h3 className={classes.subTitle}>
          طريقة الدفع الوحيدة تكون عن طريق خدمة الـ{" "}
          <span className={classes.qColor}>PAYPAL</span>
        </h3>
        <div className={classes.sperator}></div>
        <h2 className={classes.headline}>للتواصل</h2>
        <div className={classes.contact}>
          <FaEnvelope className={classes.icon} />
          <h3 className={`${classes.subTitle} ${classes.qColor}`}>
            alsalam@test.com
          </h3>
        </div>
        <div className={classes.contact}>
          <FaPhone className={classes.icon} />

          <h3 className={`${classes.subTitle} ${classes.qColor}`}>44433322</h3>
        </div>
        <div className={classes.contact}>
          <FaMapMarkedAlt className={classes.icon} />
          <h3 className={`${classes.subTitle} ${classes.qColor}`}>
            22 - شارع عمر بن الخطاب - الدفنة
          </h3>
        </div>
      </div>
      <Button className={classes.buttonStyle} onClick={() => history.push("/")}>
        العودة الى الصفحة الرئيسية
      </Button>
    </div>
  );
};

export default WhoAreWe;
