import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import OutlinedInput from "@material-ui/core/OutlinedInput";

import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    // flexWrap: "wrap",
  },
  form: {
    display: "flex",
  },
  input: {
    display: "block",
  },

  buttonStyle: {
    height: "3.5rem",
    background: " #21ACFA ",
    color: "#fff",
    borderRadius: "5px",
    fontSize: "1rem",
    fontFamily: "Tajawal",
    marginLeft: "10px",
    width: "100px",
    transition: "all 0.5s ease",
    "&:hover": {
      background: "#1A8ACA",
    },
  },
}));

const Promo = () => {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   amount: "",
  //   password: "",
  //   weight: "",
  //   weightRange: "",
  //   showPassword: false,
  // });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  // const handleClickShowPassword = () => {
  //   setValues({ ...values, showPassword: !values.showPassword });
  // };

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };

  return (
    <div className={classes.root}>
      <FormControl className={classes.form} variant="outlined">
        <OutlinedInput
          className={classes.input}
          id="outlined-adornment-weight"
          // value={values.weight}
          // onChange={handleChange("weight")}
          endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            "aria-label": "weight",
          }}
          labelWidth={0}
        />
        <Button
          className={classes.buttonStyle}
          onClick={() => console.log("3")}
        >
          تحقق التوافر
        </Button>
        {/* <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText> */}
      </FormControl>
    </div>
  );
};

export default Promo;
