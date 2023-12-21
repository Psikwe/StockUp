import axios from "axios";
import { ILogin, ISignup } from "../interface";

export const SignupUser = async (data: ISignup) => {
  return axios.post("http://localhost:5000/api/user/signup", data);
};

export const LoginRequest = async (data: ILogin) => {
  return await axios.post("http://localhost:5000/api/user/login", data);
};
