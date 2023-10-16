import axios from "axios";

const instance = axios.create({
  baseURL: "https://task-react-auth.herokuapp.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    // if there is a token
    config.headers.Authorization = `Bearer ${token}`; // cut the request and send the token
  }
  return config;
});
export default instance;
