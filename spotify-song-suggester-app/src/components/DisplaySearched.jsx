  
import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import * as yup from 'yup'

import { connect } from 'react-redux'; 
import { useParams } from 'react-router-dom'; 



const useStyles = makeStyles((theme) => ({
     icon: {
          marginRight: theme.spacing(2),
     },
     heroContent: {
          backgroundColor: '#1DB954',
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
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '3%',
          backgroundColor: '#2a2a2a'
 
     },
     cardMedia: {
          paddingTop: '95.25%', // 16:9
          border:'.5px solid #2a2a2a',
          borderRadius: '5px',
     },
     cardContent: {
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          padding: '2%',
     },
     footer: {
          backgroundColor: '#1DB954',
          padding: theme.spacing(6),
     },
     root: {
          display: 'flex',
          justifyContent: 'center',
          '& > * + *': {
               marginLeft: theme.spacing(0),
          },
     },
     textMargin: {
          marginTop: '2%',
          color: '#FFFFFF'
     },
     addToFavorites: {
          marginTop: '5%',
          backgroundColor: 'primary',
          fontWeight: 'bolder',
     }
}));

const cards = [1, 2, 3, 4, 5, 6];
const getUrl = 'https://api.github.com/users/octocat'
const dummyDataUrl = 'https://spotify-song-suggester-4.herokuapp.com/dummy_data'

const initialSearchFormValue = {
     song: '',
     artist: '',
   }
   const initialSearchFormErrors = {
     song: 'Please enter song title and artist name',
     artist: 'Both are required',
   }

   
const searchFormSchema = yup.object().shape({
     song: yup
     .string()
     .required('Song Title is Required')
     .min(2, 'Song Title is Required'),
     artist: yup
     .string()
     .required('Artist name is required')
     .min(2, 'Artist name is required'),
   })


function DisplaySearched(props) {

     const { id } = useParams(); 

     const { searches, setFavorite } = props

     
     const classes = useStyles();

     // const [songInfo, setSongInfo] = useState([])


     // useEffect(() => {

     //      axios.get(dummyDataUrl)
     //           .then(response => {
     //                // console.log('working')
     //                // console.log(response.data)
     //                setSongInfo([response.data])
     //           })
     //           .catch(err => {
     //                console.log('error',)
     //           })
     // }, []
     // )

     // useEffect(() => {

     //      axios.get(`https://spotify-song-suggester-4.herokuapp.com/search_something/${songInfo.artist}/${songInfo.song}`)
     //           .then(response => {
     //                // console.log('working')
     //                // console.log(response.data)
     //                setSongInfo(response.data)
     //           })
     //           .catch(err => {
     //                console.log('error',)
     //           })
     // }, [songInfo.artist, songInfo.song]
     // )


     let sampleArray = []; 
     for(let obj in searches){
          sampleArray.push(searches[obj])
     }
     // if (!sampleArray.length) {
     //      return (
     //           <div className={classes.root}>
     //                <CircularProgress />
     //           </div>
     //      )
     // }

     const makeFavorite = (songId) => {
          // event.preventDefault(); 

          axios
          .post(`https://spotify-song-suggester-project.herokuapp.com/api/songs/${songId}`)
          .then(res => {
               console.log('the added favorite', res.data)
               setFavorite(res.data)
          })
          .catch(err => {
               console.log('error in DS', err); 
          })
     }




     
     console.log('the sample array with suggestions redux',sampleArray)
     // console.log(searches)
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
                                        <Typography gutterBottom variant="h4" component="h2" className={classes.textMargin}>
                                             {specificSongInfo.track_name}
                                        </Typography>
                                        <Typography variant='h6' className={classes.textMargin}>
                                             {specificSongInfo.artist}
                                        </Typography>
                                        <Typography className={classes.textMargin}>
                                             {specificSongInfo.album_name}
                                        </Typography>
                                        <Button onClick={() => makeFavorite(specificSongInfo.track_id)} variant='contained' className={classes.addToFavorites}>
                                             Add to Favorites
                                        </Button>
                                   </CardContent>
                                   <CardActions>                                        
                                        <iframe src={`https://embed.spotify.com/?uri=spotify:track:${specificSongInfo.track_id}&view=coverart&theme=black`} height='55%' width='100%'></iframe>
                                   </CardActions>
                              </Card>
                         </Grid>
                         
                    ))}
               </Grid>
          </Container>

     )
}
 
const mapStateToProps = state => {
     return{ 
          suggestions: state.spotify.suggestions
     }
}

export default connect(
     mapStateToProps, 
     {}
)(DisplaySearched)