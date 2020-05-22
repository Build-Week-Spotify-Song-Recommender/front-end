import axios from "axios";

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  const token = localStorage.getItem("token");
  return axios.create({
    headers: {
      Authorization: token,
    },
    //baseURL: 'https://spotify-song-suggester-project.herokuapp.com/api'
    baseURL: "http://localhost:4000/api",
  });
};
