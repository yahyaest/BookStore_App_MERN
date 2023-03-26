import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { returnErrors } from "./errors";

const apiEndpoint = "/auth";

const slice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    isAdmin: null,
    isAuthenticated: null,
    isLoading: false,
    user: null,
    username: localStorage.getItem("username"),
  },
  reducers: {
    userLoading: (auth, action) => {
      auth.isLoading = true;
    },
    userLoaded: (auth, action) => {
      localStorage.setItem("username", action.username);
      auth.isAdmin = action.payload.isAdmin;
      auth.isAuthenticated = true;
      auth.isLoading = false;
      auth.user = action.payload;
      auth.username = action.username;
    },
    authError: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAdmin = false;
      auth.isAuthenticated = false;
      auth.isLoading = false;
    },
    loginSuccess: (auth, action) => {
      localStorage.setItem("token", action.payload);
      // localStorage.setItem("username", action.payload.user.username);
      auth.token = action.payload;
      auth.isAdmin = action.payload.isAdmin;
      auth.isAuthenticated = true;
      auth.isLoading = false;
      auth.user = action.payload.user;
      // auth.username = action.payload.user.username;
    },
    loginFail: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAdmin = false;
      auth.isAuthenticated = false;
      auth.isLoading = false;
    },
    logoutSuccess: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAdmin = false;
      auth.isAuthenticated = false;
      auth.isLoading = false;
    },
    registerSuccess: (auth, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
      auth.isAdmin = false;
      auth.isAuthenticated = true;
      auth.isLoading = false;
    },
    registerFail: (auth, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      auth.token = null;
      auth.user = null;
      auth.isAdmin = false;
      auth.isAuthenticated = false;
      auth.isLoading = false;
    },
  },
});


export const {
  userLoading,
  userLoaded,
  authError,
  loginSuccess,
  loginFail,
  logoutSuccess,
  registerSuccess,
  registerFail,
} = slice.actions;
export default slice.reducer;

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({
    type: slice.actions.userLoading.type,
  });

  http
    .get("/users/me", tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: slice.actions.userLoaded.type,
        payload: res.data,
        username: res.data.username,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response?.data, err.response?.status));
      dispatch({ type: slice.actions.authError.type });
    });
};

// LOGIN USER
export const login = (username, password) => async (dispatch, getState) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  await http
    .post(apiEndpoint, body, config)
    .then((res) => {
      dispatch({ type: slice.actions.loginSuccess.type, payload: res.data });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response?.data, err.response?.status));
      console.log(err);
      dispatch({ type: slice.actions.loginFail.type });
    });

  await http
    .get(`/users/me`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: slice.actions.userLoaded.type,
        payload: res.data,
        username: res.data.username,
      })
    )
    .catch((err) => {
      // dispatch(returnErrors(err.response?.data, err.response?.status));
      dispatch({ type: slice.actions.authError.type });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  try {
    dispatch({ type: slice.actions.logoutSuccess.type });
  } catch (err) {
    console.log(err);
    dispatch(returnErrors(err.response?.data, err.response?.status));
  }
};

// REGISTER USER
export const register =
  ({ username, password, email, country, age }) =>
  (dispatch) => {
    // Headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Request Body
    const body = JSON.stringify({ username, password, email, country, age });

    http
      .post("/users", body, config)
      .then((res) =>
        dispatch({
          type: slice.actions.registerSuccess.type,
          payload: res.data,
        })
      )
      .catch((err) => {
        dispatch(returnErrors(err.response?.data, err.response?.status));
        dispatch({ type: slice.actions.registerFail.type });
      });
  };

// Setup config with token - helper function

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
    config.headers["x-auth-token"] = `${token}`;
  }

  return config;
};
