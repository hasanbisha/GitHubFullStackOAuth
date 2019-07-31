import { GET_USER_CRE, GET_USER_REP } from "../actions/types";

const initialState = {
  basicCrd: [],
  repositories: [],
  isLoading: true,
  access_token: ""
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_CRE:
      return {
        ...state,
        basicCrd: action.payload,
        isLoading: false
      };
    case GET_USER_REP:
      return {
        ...state,
        repositories: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
};
