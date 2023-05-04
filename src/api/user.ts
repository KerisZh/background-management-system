import axios from "../axios";

const userLogin = (data: any) => {
  return axios.post("/login", data);
};

const userRegister = (data: any) => {
  return axios.post("/register", data);
};

const userModify = (data: any) => {
  return axios.post("/modify", data);
};

export { userLogin, userRegister, userModify };
