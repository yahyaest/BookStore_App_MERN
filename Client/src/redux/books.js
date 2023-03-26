import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { tokenConfig } from "./auth";

const apiEndpoint = "/books";

const slice = createSlice({
  name: "books",
  initialState: { books: [], currentBook: {} },
  reducers: {
    bookAdded: (books, action) => {
      books.push(action.payload);
    },
    booksloaded: (books, action) => {
      books.books = action.payload;
    },
    bookloaded: (books, action) => {
      books.currentBook = action.payload;
    },
    bookRemoved: (books, action) => {
      const index = books.books.findIndex((book) => book.id === action.id);
      books.splice(index, 1);
    },
  },
});

console.log(slice);

export const { bookAdded, bookloaded, bookRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadBooks = () => async (dispatch) => {
  await http
    .get(apiEndpoint)
    .then((res) => {
      dispatch({
        type: slice.actions.booksloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadBook = (id) => async (dispatch) => {
  await http
    .get(`${apiEndpoint}/${id}/`)
    .then((res) => {
      dispatch({
        type: slice.actions.bookloaded.type,
        payload: res.data,
        id,
      });
    })
    .catch((err) => console.log(err));
};

export const addBook = (book) => (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  http
    .post(apiEndpoint, book, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.bookAdded.type,
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

export const deleteBook = (id) => (dispatch, getState) => {
  let errorObject = {
    isError: false,
    errorMessage: "",
  };

  http
    .delete(`${apiEndpoint}/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.bookRemoved.type,
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
