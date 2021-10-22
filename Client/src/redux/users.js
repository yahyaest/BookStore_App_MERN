import { createSlice } from "@reduxjs/toolkit";
import { forEach } from "lodash";
import http from "../services/httpService";
import { tokenConfig } from "./auth";

const apiEndpoint = "/users";

const slice = createSlice({
  name: "users",
  initialState: { users: [], currentUser: {} },
  reducers: {
    userAdded: (users, action) => {
      users.users.push(action.payload);
    },
    usersLoaded: (users, action) => {
      users.users = action.payload;
    },
    userLoaded: (users, action) => {
      users.currentUser = action.payload;
    },
    userObjectUpdated: (users, action) => {
      const index = users.users.findIndex((user) => user._id === action.id);
      users.users[index] = action.payload;
    },
    userUpdated: (users, action) => {
      const index = users.users.findIndex((user) => user._id === action.id);
      const keys = Object.keys(action.payload.$set);
      let user = { ...users.users[index] };

      keys.forEach((key) => {
        user[`${key}`] = action.payload.$set[`${key}`];
      });

      users.users[index] = user;
    },
    userRemoved: (users, action) => {
      const index = users.users.findIndex((user) => user.id === action.id);
      users.users.splice(index, 1);
    },
  },
});

console.log(slice);

export const {
  userAdded,
  usersLoaded,
  userLoaded,
  userObjectUpdated,
  userUpdated,
  userRemoved,
} = slice.actions;
export default slice.reducer;

// Action Creators
export const loadUsers = () => async (dispatch, getState) => {
  await http
    .get(apiEndpoint, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.usersLoaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response?.data));
};

export const loadCurrentUser = () => async (dispatch, getState) => {
  await http
    .get(`${apiEndpoint}/me`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.userLoaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err.response?.data));
};

export const addUser = (user) => async (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await http
    .post(apiEndpoint, user, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.userAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err.response?.data);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data;
    });

  return errorObject;
};

export const updateAllUser = (user, id) => async (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await http
    .put(`${apiEndpoint}/${id}/`, user, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.userObjectUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => {
      console.log(err.response?.data);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data;
    });

  return errorObject;
};

export const updateUser = (user, id) => async (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  const {
    username,
    email,
    password,
    isAdmin,
    ordered_books,
    liked_books,
    age,
    country,
  } = user;
  await http
    .patch(
      `${apiEndpoint}/${id}/`,
      {
        username,
        email,
        password,
        isAdmin,
        ordered_books,
        liked_books,
        age,
        country,
      },
      tokenConfig(getState)
    )
    .then((res) => {
      dispatch({
        type: slice.actions.userUpdated.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => {
      console.log(err.response?.data);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data;
    });

  return errorObject;
};

export const deleteUser = (id) => async (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  await http
    .delete(`${apiEndpoint}/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.userRemoved.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => {
      console.log(err.response?.data);
      errorObject.isError = true;
      errorObject.errorMessage = err.response?.data;
    });

  return errorObject;
};
