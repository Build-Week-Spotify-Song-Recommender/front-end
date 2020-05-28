import React, { useState, useEffect } from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Headset from "@material-ui/icons/Headset";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import axios from "axios";

import { connect } from "react-redux";
import Login from "../Login";

import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useStyles } from "../styling/styles";

function Favorites(props) {
  const classes = useStyles();
  const [favoritesInfo, setFavoritesInfo] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    axiosWithAuth()
      .get(`/songs/${userId}`)
      .then((response) => {
        console.log(response.data.allSavedSongs);
        setFavoritesInfo(response.data.allSavedSongs);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const removeFromFavorites = (song) => {
    const userId = localStorage.getItem("userId");

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: JSON.parse(localStorage.getItem("token")),
    };

    console.log(song);

    axios
      .delete(`http://localhost:4000/api/songs/${userId}`, {
        headers,
        data: JSON.stringify(song),
      })
      .then((res) => {
        console.log("response from remove a song", res.data);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });

    const indexOfASong = favoritesInfo.indexOf(song);

    const copyOfFovatires = [...favoritesInfo];

    copyOfFovatires.splice(indexOfASong, 1);

    setFavoritesInfo(copyOfFovatires);
  };

  return props.authenticated ? (
    <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
      <Grid container spacing={7}>
        {favoritesInfo.map((specificSongInfo, idx) => (
          <Grid item key={idx} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardMedia
                className={classes.cardMedia}
                image={specificSongInfo.album_cover}
                title="Image title"
              />

              <CardContent className={classes.cardContent}>
                <Typography
                  gutterBottom
                  variant="h4"
                  component="h2"
                  className={classes.textMargin}
                >
                  {specificSongInfo.track_name}
                </Typography>
                <Typography variant="h6" className={classes.textMargin}>
                  {specificSongInfo.artist}
                </Typography>
                <Typography className={classes.textMargin}>
                  {specificSongInfo.album_name}
                </Typography>
                <Button
                  onClick={() => removeFromFavorites(specificSongInfo)}
                  variant="contained"
                  className={classes.addToFavorites}
                >
                  Remove from favorites
                </Button>
              </CardContent>
              <CardActions>
                <iframe
                  src={`https://embed.spotify.com/?uri=spotify:track:${specificSongInfo.track_id}&view=coverart&theme=black`}
                  height="55%"
                  width="100%"
                ></iframe>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  ) : (
    <Login values={props.values} onInputChange={props.onInputChange} />
  );
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.authenticated,
  };
};

export default connect(mapStateToProps, {})(Favorites);
