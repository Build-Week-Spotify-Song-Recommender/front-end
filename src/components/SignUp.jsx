import React, { useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Headset from "@material-ui/icons/Headset";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Snackbar from "@material-ui/core/Snackbar";
import { Link as RouterLink, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";

import { Copyright } from "./copyRight/copyRightComponent";
import { useStyles } from "./styling/styles";

function SignUp(props) {
  const { values, disabled, errors, onInputChange } = props;

  const classes = useStyles();

  const history = useHistory();

  const formSubmit = (e) => {
    e.preventDefault();
    const clientURL =
      "https://spotify-song-suggester-project.herokuapp.com/api/auth/register";
    //const clientURL = "http://localhost:4000/api/auth/register";
    axios
      .post(clientURL, values)
      .then((res) => {
        console.log("res.data from posting", res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    history.push("/");
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Headset />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
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
                autoComplete="current-password"
                value={values.password}
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
          </div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
            disabled={disabled}
          >
            <RouterLink to="/" className={classes.linkButtons}>
              Sign Up
            </RouterLink>
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to="/">Already have an account? Sign in</RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default SignUp;
