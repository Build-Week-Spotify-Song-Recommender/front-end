import React from "react";
import axios from "axios";
import { authorization } from "./actions/index.js";
import { connect } from "react-redux";

import { useHistory } from "react-router-dom";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import { useStyles } from "./styling/styles";

import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Headset from "@material-ui/icons/Headset";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";

const UpdateUser = (props) => {
  const { values, disabled, errors, onInputChange } = props;

  const classes = useStyles();

  const history = useHistory();

  const formSubmit = (e) => {
    axiosWithAuth
      .post("/updatepassword", values)
      .then((res) => {
        console.log("res.data from posting", res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
    history.push("/");
  };

  return (
    <div>
      <h2>Update Your Information Below!</h2>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps, {})(UpdateUser);
