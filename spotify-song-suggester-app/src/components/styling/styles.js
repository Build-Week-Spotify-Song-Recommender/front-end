import React from "react";

import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
    marginTop: theme.spacing(3),
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
    transition: "all 0.3s linear",
    marginBottom: "15%",
  },
  linkButtons: {
    textDecoration: "none",
    color: "secondary",
  },
  errorMessages: {
    fontWeight: "bolder",
    color: "red",
  },
}));
