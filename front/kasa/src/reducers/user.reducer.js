import { GET_USER, POST_SIGNUP } from "../actions/user.actions";

const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case POST_SIGNUP:
      return action.payload;

    default:
      return state;
  }
}
