import axios from "axios";

export const axiosWithAuth = () => {
  // returns an "instance" of axios, with preconfigured configs
  const token = JSON.parse(localStorage.getItem("token"));
  return axios.create({
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token,
    },
    baseURL: "https://spotify-song-suggester-project.herokuapp.com/api",
    //baseURL: "http://localhost:4000/api",
  });
};
