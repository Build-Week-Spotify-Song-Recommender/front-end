import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import { useStyles } from "./styling/styles";
import { Copyright } from "./copyRight/copyRightComponent";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Headset from "@material-ui/icons/Headset";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import * as yup from "yup";

const UpdateUser = (props) => {
  const [disabled, setDisabled] = useState(true);
  const [values, setValues] = useState({
    ///// TEXT INPUTS /////
    username: "",
    emailAddress: "",
    password: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    ///// TEXT INPUTS /////
    username: "",
    emailAddress: "",
    password: "",
    newPassword: "",
  });

  const formSchema = yup.object().shape({
    username: yup
      .string()
      .required("Username is required")
      .min(3, "Username must have at least 3 characters"),
    emailAddress: yup
      .string()
      .required("Email is required")
      .email("Valid email is required"),
    password: yup.string().required("Password is required"),
    newPassword: yup
      .string()
      .required("New Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
        "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const classes = useStyles();

  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put("/auth/updatepassword", values)
      .then((res) => {
        console.log("res.data from posting", res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    history.push("/");
  };

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    e.persist();
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        //clear errors
        setErrors({
          ...errors,
          [name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [name]: err.errors[0],
        });
      });
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    formSchema.isValid(values).then((valid) => {
      setDisabled(!valid);
    });
  }, [values]);

  return props.authenticated ? (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Headset />
        </Avatar>
        <Typography component="h1" variant="h5">
          Update Password
        </Typography>
        <form onSubmit={formSubmit} className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={values.username}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="emailAddress"
                label="Email Address"
                name="emailAddress"
                value={values.emailAddress}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={values.password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="newPassword"
                label="New Password"
                type="password"
                id="newPassword"
                value={values.newPassword}
                onChange={onInputChange}
              />
            </Grid>
          </Grid>
          <div className="errors">
            <h3 className={classes.errorMessages} value={errors.username}>
              {errors.username}
            </h3>

            <h3 className={classes.errorMessages} value={errors.emailAddress}>
              {errors.emailAddress}
            </h3>

            <h3 className={classes.errorMessages} value={errors.password}>
              {errors.password}
            </h3>

            <h3 className={classes.errorMessages} value={errors.newPassword}>
              {errors.newPassword}
            </h3>
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
            disabled={disabled}
          >
            <RouterLink to="/home" className={classes.linkButtons}>
              Sign Up
            </RouterLink>
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps, {})(UpdateUser);
