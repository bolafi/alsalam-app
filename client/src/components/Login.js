import { useState } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Cookie from "js-cookie";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
    margin: "3rem auto",
    "& .MuiTextField-root": {
      fontSize: "2rem",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: "3rem",
    color: "#fff",
    textAlign: "center",
    [theme.breakpoints.down("xs")]: {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("sm")]: {
      fontSize: "2rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "3rem",
    },
  },
  field: {
    direction: "rtl",
    "& .MuiInputBase-input": {
      fontFamily: "Tajawal",
      fontSize: "2rem",
      [theme.breakpoints.down("xs")]: {
        fontSize: "1rem",
        width: "",
      },
    },
  },
  formContainer: {
    maxWidth: "750px",
    maxHeight: "350px",
    backgroundColor: "#fff",
    color: "#333",
    border: "5px solid #333",
    margin: "1rem 0 ",
    direction: "rtl",
    display: "grid",
    gridTemplateColumns: "1fr",
    justifyContent: "center",
    padding: "1rem 2rem",
    [theme.breakpoints.down("xs")]: {
      padding: "1rem 2rem",
      width: "330px",
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
    marginTop: "2rem",
    transition: "all 0.5s ease",
    "&:hover": {
      background: "#1A8ACA",
    },
  },
  alert: {
    width: "100%",
  },
}));

const loginUser = async (userData) => {
  try {
    const data = await fetch("alsalam-app.herokuapp.com/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const res = await data.json();
    return res;
  } catch (error) {
    console.error(error.message);
  }
};

const Login = ({ setToken, checkUser }) => {
  const classes = useStyles();
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === undefined || password === undefined) {
      setError(true);
      setMsg("حط ايميلك وكلمة السر");
      setTimeout(() => setError(false), 5000);
      return;
    }

    const token = await loginUser({
      email,
      password,
    });

    if (token.token) {
      Cookie.set("token", token);

      checkUser();
      history.push("/");
    } else {
      setError(true);
      setMsg(" الايميل او كلمة السر التي ادخلتها غير صحيحة");
      setTimeout(() => setError(false), 5000);
    }
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.heading}>إملئ الحقول لإكمال التسجيل</h1>
      <div className={classes.formContainer}>
        <form
          onSubmit={handleSubmit}
          className={classes.form}
          noValidate
          autoComplete="off"
        >
          {error && (
            <Alert variant="filled" className={classes.alert} severity="error">
              {msg}
            </Alert>
          )}
          <TextField
            className={classes.field}
            style={{ margin: 8 }}
            placeholder="الايميل"
            fullWidth
            margin="normal"
            type="email"
            color="primary"
            variant="outlined"
            fontSize=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            className={classes.field}
            style={{ margin: 8 }}
            placeholder="كلمة السر"
            fullWidth
            type="password"
            margin="normal"
            color="primary"
            variant="outlined"
            fontSize=""
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className={classes.buttonStyle}>
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
