import axios from "axios";

export default axios.create({
  baseURL: "http://127.0.0.1:5000",
  withCredentials: false,
  headers: {
    "Content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
