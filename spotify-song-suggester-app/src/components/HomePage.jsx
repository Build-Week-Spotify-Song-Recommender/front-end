import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Headset from "@material-ui/icons/Headset";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import DisplaySearched from "./DisplaySearched";
import { Route, Switch } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import logo from "./logo/logo.png";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#1DB954",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: "#1DB954",
    color: "white",
    padding: theme.spacing(6),
  },
  searchButtons: {
    textDecoration: "none",
  },
  root: {
    display: "flex",
    "flex-direction": "column",
    "& > *": {
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  image: {
    border: "1px solid black",
    borderRadius: "30px",
    boxShadow: "0 5px 5px rgba(0,0,0,0.6)",
    marginBottom: "5%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  errorMessages: {
    fontWeight: "bolder",
    color: "#1DB954",
  },
}));

export default function HomePage(props) {
  const {
    searchFormValue,
    onSearch,
    onSearchInputChange,
    errors,
    disabled,
  } = props;

  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <img src={logo} className={classes.image} width="60%" />
          <Container className={classes.container} maxWidth="sm">
            <Typography
              variant="h3"
              align="center"
              color="textSecondary"
              paragraph
            >
              Welcome
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Search for new music - the smart way
            </Typography>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                name="song"
                onChange={onSearchInputChange}
                id="outlined-basic"
                label="Search by Song Title"
                variant="outlined"
                value={searchFormValue.song}
              />

              <TextField
                name="artist"
                onChange={onSearchInputChange}
                id="outlined-basic"
                label="Search by Artist"
                variant="outlined"
                value={searchFormValue.artist}
              />
            </form>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button
                    onClick={onSearch}
                    disabled={disabled}
                    className="searchButtons"
                    variant="contained"
                    color="primary"
                  >
                    Search For New Songs
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
                <div className="errors">
                  <h3 className={classes.errorMessages} value={errors.song}>
                    {errors.song}
                  </h3>

                  <h3 className={classes.errorMessages} value={errors.artist}>
                    {errors.artist}
                  </h3>
                </div>
              </Grid>
            </div>
          </Container>
        </div>
        {/* end hero unit */}
      </main>
      {/* <Route path='/home/search'>
      <DisplaySearched />
      </Route> */}
      <DisplaySearched />
    </React.Fragment>
  );
}
