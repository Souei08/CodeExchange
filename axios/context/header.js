import axios from "axios";

const headers = axios.create({
  baseURL: "http://192.168.1.104:5000",
});

export default headers;
