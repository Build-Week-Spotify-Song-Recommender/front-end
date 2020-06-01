import React from "react";
import { Link as RouterLink } from "react-router-dom";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import MenuTab from "./menuComponents/MenuTab";

import { authorization } from "./actions/index";

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

function NavBar(props) {
  const classes = useStyles();

  const signOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    props.authorization(false);
  };

  return props.authenticated ? (
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
              <Button onClick={signOut}>
                <RouterLink
                  color="secondary"
                  to="/home"
                  className={classes.linkButtons}
                >
                  <Typography variant="h6" color="secondary" noWrap>
                    Log-out
                  </Typography>
                </RouterLink>
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  ) : (
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
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps, { authorization })(NavBar);
