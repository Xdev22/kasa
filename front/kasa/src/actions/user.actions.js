import axios from "axios";

export const GET_USER = "GET_USER";
export const POST_SIGNUP = "POST_SIGNUP";

export const getUser = (uid) => {
  //dispatch est ce qu'on retourne au reducer
  return (dispatch) => {
    return axios({
      method: "GET",
      url: `http://localhost:8000/api/user/auth/${uid}`,
      withCredentials: true,
    })
      .then((res) => {
        // console.log(res);
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const signUp = (form) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `http://localhost:8000/api/user/auth/signup`,
      withCredentials: true,
      data: form,
    })
      .then((res) => {
        // console.log(res);
        dispatch({ type: POST_SIGNUP, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
