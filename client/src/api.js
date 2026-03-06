import axios from "axios";

const API = axios.create({
  baseURL: "https://gidy-profile-section.onrender.com/api/profile"
});

export default API;