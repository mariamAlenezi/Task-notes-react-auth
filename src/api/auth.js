import jwt_decode from "jwt-decode";
import instance from ".";

const login = async (userInfo) => {
  const { data } = await instance.post("/auth/login", userInfo);
  storeToken(data?.token);
  return data;
};

const register = async (userInfo) => {
  const formData = new FormData();
  for (const key in userInfo) formData.append(key, userInfo[key]);
  const { data } = await instance.post("/auth/register", formData);
  storeToken(data.token);
  return data;
};

const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const checkToken = () => {
  const token = localStorage.getItem("token"); // take the token from local storage
  if (token) {
    const decode = jwt_decode(token); //decode the token
    const cureentTime = Date.now() / 1000; // Date.now " is the timestamp "
    if (decode.exp < cureentTime) {
      // decode.exp "means expired time"
      localStorage.removeItem("token"); // remove it
      return false;
    } else {
      return true;
    }
  }
  return false;
};

const me = async () => {
  const { data } = await instance.get("/auth/me");
  return data;
};

const getAllUsers = async () => {
  const { data } = await instance.get("/auth/users");
  return data;
};

export { login, register, me, getAllUsers, checkToken, storeToken };
