import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import { axiosWithAuth } from "./utils/axiosWithAuth";
import { useStyles } from "./styling/styles";

function DisplaySearched(props) {
  const userId = localStorage.getItem("userId");
  const { searches } = props;

  const classes = useStyles();

  let sampleArray = [];
  for (let obj in searches) {
    sampleArray.push(searches[obj]);
  }

  const addToFavorites = (song) => {
    // event.preventDefault();

    axiosWithAuth()
      .post(`/songs/${userId}`, song)
      .then((res) => {
        console.log("the added favorite", res.data);
      })
      .catch((err) => {
        console.log("error:", err.message);
      });
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <CssBaseline />
      <Grid container spacing={7}>
        {sampleArray.map((specificSongInfo, idx) => (
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
                  onClick={() => addToFavorites(specificSongInfo)}
                  variant="contained"
                  className={classes.addToFavorites}
                >
                  Add to Favorites
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
  );
}

export default DisplaySearched;
