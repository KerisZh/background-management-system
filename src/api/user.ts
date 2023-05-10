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

const getUsers = () => {
  return axios.get("/users");
}

const deleteUser = (data: any) => {
  return axios.post("/delete", data);
}

export { userLogin, userRegister, userModify, getUsers, deleteUser };
