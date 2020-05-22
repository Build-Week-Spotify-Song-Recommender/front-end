import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Headset from "@material-ui/icons/Headset";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as RouterLink, Router } from "react-router-dom";
import axios from "axios";

import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "../utils/axiosWithAuth";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Spotify Suggester
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#1DB954",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#1DB954",
  },
  container: {
    border: "1px solid #eee",
    borderRadius: "7px",
    boxShadow: "0 5px 5px rgba(0,0,0,0.1)",
    marginTop: "5%",
    marginBottom: "15%",

    transition: "all 0.3s linear",
  },
  linkButtons: {
    textDecoration: "none",
    color: "secondary",
  },
}));

export default function SignIn(props) {
  const { values, disabled, errors, onInputChange } = props;

  const classes = useStyles();

  const history = useHistory();

  const logginIn = (e) => {
    e.preventDefault();

    axiosWithAuth()
      .post("/auth/login", values)
      .then((res) => {
        console.log("response from login", res);
        localStorage.setItem("token", JSON.stringify(res.data.token));
        localStorage.setItem("userId", JSON.stringify(res.data.id));
        history.push("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container className={classes.container} component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <Headset />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form onSubmit={logginIn} className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={values.username}
            onChange={onInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
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

          <Button
            // onClick={logginIn}
            type="submit"
            fullWidth
            variant="contained"
            color="inherit"
            className={classes.submit}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                <RouterLink to="/signup">
                  {"Don't have an account? Sign Up"}
                </RouterLink>
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
