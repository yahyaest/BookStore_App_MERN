import { combineReducers } from "redux";
import auth from "./auth";
import errors from "./errors";
import messages from "./messages";
import users from "./users";
import books from "./books";
import comments from "./comments";
import orders from "./orders";
import admin from "react-admin-table/dist/redux/admin";

export default combineReducers({
  admin,
  auth,
  users,
  books,
  comments,
  orders,
  errors,
  messages,
});
