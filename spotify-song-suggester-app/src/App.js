import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import DisplaySearched from "./components/DisplaySearched";
import UpdateUser from "./components/menuComponents/UpdateUser";

import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuTab from "./components/menuComponents/MenuTab";
import Favorites from "./components/menuComponents/Favorites";
import NavBar from "./components/NavBar";
import Suggestions from "./components/menuComponents/Suggestions";

import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import { v4 as uuid } from "uuid";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/"></Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialSearchFormValue = {
  song: "",
  artist: "",
};
const initialSearchFormErrors = {
  song: "Please enter song title and artist name",
  artist: "Both are required",
};
const initialFormValues = {
  ///// TEXT INPUTS /////
  username: "",
  emailAddress: "",
  password: "",
};

const initialFormErrors = {
  username: "",
  emailAddress: "",
  password: "",
};

const formSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Username must have at least 3 characters"),
  emailAddress: yup
    .string()
    .required("Email is required")
    .email("Valid email is required"),
  password: yup
    .string()
    .required("Password is required")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/,
      "Must Contain 6 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
});

const searchFormSchema = yup.object().shape({
  song: yup
    .string()
    .required("Song Title is Required")
    .min(2, "Song Title is Required"),
  artist: yup
    .string()
    .required("Artist name is required")
    .min(2, "Artist name is required"),
});

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
}));

function App(props) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [formDisabled, setFormDisabled] = useState(true);
  const [searchFormValue, setSearchFormValue] = useState(
    initialSearchFormValue
  );
  // const [searches, setSearches] = useState({})
  const [searchFormErrors, setSearchFormErrors] = useState(
    initialSearchFormErrors
  );
  const [searchFormDisabled, setSearchFormDisabled] = useState(true);
  const [newSearch, setNewSearch] = useState({});
  const history = useHistory();

  useEffect(() => {
    searchFormSchema.isValid(searchFormValue).then((valid) => {
      setSearchFormDisabled(!valid);
    });
  }, [searchFormValue]);

  useEffect(() => {
    formSchema.isValid(formValues).then((valid) => {
      setFormDisabled(!valid);
    });
  }, [formValues]);

  const onInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    e.persist();
    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        //clear errors
        setFormErrors({
          ...formErrors,
          [name]: "",
        });
      })
      .catch((err) => {
        setFormErrors({
          ...formErrors,
          [name]: err.errors[0],
        });
      });
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSearchInputChange = (e) => {
    const searchName = e.target.name;
    const searchValue = e.target.value;

    yup
      .reach(searchFormSchema, searchName)
      .validate(searchValue)
      .then((valid) => {
        //clear errors
        setSearchFormErrors({
          ...searchFormErrors,
          [searchName]: "",
        });
      })
      .catch((err) => {
        setSearchFormErrors({
          ...searchFormErrors,
          [searchName]: err.errors[0],
        });
      });
    setSearchFormValue({
      ...searchFormValue,
      [searchName]: searchValue,
    });
    console.log(searchFormValue);
  };

  useEffect(() => {
    setSearchFormValue(searchFormValue);
    console.log(searchFormValue);
  }, [searchFormValue]);

  const onSearch = (e) => {
    e.preventDefault();
    //  setNewSearch({
    //   song: searchFormValue.song.replace('/\s/', '%20'),
    //   artist: searchFormValue.artist.replace('/\s/', '%20')
    //  }
    //  )
    history.push("/home/search");
    console.log(newSearch);
    props.fetchSuggestions(searchFormValue);
    console.log(props.favorites, "this is favorites");
    setSearchFormValue(initialSearchFormValue);
  };

  const classes = useStyles();
  return (
    <div className="App">
      <CssBaseline />
      <NavBar />

      <Switch>
        <Route exact path="/signup" component={SignUp}>
          <SignUp
            values={formValues}
            disabled={formDisabled}
            errors={formErrors}
            onInputChange={onInputChange}
          />
        </Route>
        <Route exact path="/favorites/suggestions">
          <Suggestions />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>

        <Route path="/home/search">
          <DisplaySearched searches={props.suggestions} />
        </Route>
        <Route exact path="/home">
          <HomePage
            searchFormValue={searchFormValue}
            onSearch={onSearch}
            onSearchInputChange={onSearchInputChange}
            errors={searchFormErrors}
            disabled={searchFormDisabled}
            initialSearchFormValue={initialSearchFormValue}
          />
        </Route>

        <Route exact path="/">
          <Login values={formValues} onInputChange={onInputChange} />
        </Route>
      </Switch>

      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" component="p">
          Spotify Song Suggester
        </Typography>
        <Copyright />
      </footer>
    </div>
  );
}

export default App;
