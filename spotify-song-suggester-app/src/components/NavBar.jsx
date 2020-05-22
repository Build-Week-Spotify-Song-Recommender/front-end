import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuTab from "./menuComponents/MenuTab";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#1DB954",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
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
    padding: theme.spacing(6),
  },
  linkButtons: {
    textDecoration: "none",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <MenuTab />
        <div className={classes.appBar}>
          <Button variant="outlined" color="secondary">
            <RouterLink
              color="secondary"
              to="/home"
              className={classes.linkButtons}
            >
              <Typography variant="h6" color="secondary" noWrap>
                Home
              </Typography>
            </RouterLink>
          </Button>
          <div className={classes.root}>
            <ButtonGroup
              color="secondary"
              aria-label="outlined primary button group"
            >
              <Button>
                <RouterLink
                  color="secondary"
                  to="/"
                  className={classes.linkButtons}
                >
                  <Typography variant="h6" color="secondary" noWrap>
                    Log In
                  </Typography>
                </RouterLink>
              </Button>

              <Button>
                <RouterLink
                  color="secondary"
                  to="/signup"
                  className={classes.linkButtons}
                >
                  <Typography variant="h6" color="secondary" noWrap>
                    Sign Up
                  </Typography>
                </RouterLink>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
