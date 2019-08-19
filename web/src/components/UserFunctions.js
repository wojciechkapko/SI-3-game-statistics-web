import axios from "axios";

export const register = newUser => {
  return axios
    .post("/api/register", {
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      return {
        message: response.data.result.message,
        type: response.data.result.type
      };
    });
};

export const login = user => {
  return axios
    .post("/api/login", {
      email: user.email,
      password: user.password
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data.token);
      return response.data;
    });
};
