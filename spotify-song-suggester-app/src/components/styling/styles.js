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
  appBar: {
    backgroundColor: "#1DB954",
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: "#1DB954",
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
    padding: "3%",
    backgroundColor: "#2a2a2a",
  },
  cardMedia: {
    paddingTop: "95.25%", // 16:9
    border: ".5px solid #2a2a2a",
    borderRadius: "5px",
  },
  cardContent: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    padding: "2%",
  },
  footer: {
    backgroundColor: "#1DB954",
    padding: theme.spacing(6),
  },
  root: {
    display: "flex",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(0),
    },
  },
  textMargin: {
    marginTop: "2%",
    color: "#FFFFFF",
  },
  addToFavorites: {
    marginTop: "5%",
    backgroundColor: "primary",
    fontWeight: "bolder",
  },
}));
