import axios from "axios";

export const fetchSuggestions = (search) => {
  return (dispatch) => {
    dispatch({ type: "RENDERING_SUGGESTIONS_START" });

    const searchUrl = `https://spotify-song-suggester-4.herokuapp.com/search_something/${search.artist}/${search.song}`;

    axios
      .get(searchUrl)
      .then((res) => {
        console.log("the results from search", res.data);
        dispatch({ type: "RENDERING_SUGGESTIONS_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log("the error", err);
        dispatch({ type: "RENDERING_SUGGESTIONS_FAILED", payload: err.data });
      });
  };
};

export const fetchUser = () => {
  return (dispatch) => {
    dispatch({ type: "RENDERING_USER_START" });

    const userUrl = "https://spotify-song-suggester-4.herokuapp.com/dummy_data";

    axios
      .get(userUrl)
      .then((res) => {
        console.log("whatever res.data is", res.data);
        // set the state when receiving property of users
        dispatch({ type: "FETCH_USER_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch({ type: "RENDERING_USER_FAILED", payload: err.data });
      });
  };
};

export const sendUser = (user) => {
  return (dispatch) => {
    dispatch({ type: "SENDING_USER_START" });

    // const userUrl = 'https://spotify-song-suggester-project.herokuapp.com/api/auth/register';
    const userUrl = "http://localhost:4000/api/auth/register";
    axios
      .post(userUrl, user)
      .then((res) => {
        console.log("res.data from posting", res.data);
        dispatch({ type: "SENDING_USER_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "SENDING_USER_FAILED", payload: err.data });
      });
  };
};
