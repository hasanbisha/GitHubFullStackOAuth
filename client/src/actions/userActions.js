import { GET_USER_CRE, GET_USER_REP } from "./types";
import axios from "axios";
import Cookies from "js-cookie";

export const getUserCre = () => dispatch => {
  axios.get(`http://localhost:5000/api/user/basic-credentials`).then(res => {
    dispatch({
      type: GET_USER_CRE,
      payload: res.data
    });
  });
};

export const getUserRep = () => dispatch => {
  axios.get(`http://localhost:5000/api/user/repositories`).then(res => {
    dispatch({
      type: GET_USER_REP,
      payload: res.data
    });
  });
};
