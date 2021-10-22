import { createSlice } from "@reduxjs/toolkit";
import http from "../services/httpService";
import { tokenConfig } from "./auth";

const apiEndpoint = "/orders";

const slice = createSlice({
  name: "orders",
  initialState: { orders: {} },
  reducers: {
    orderAdded: (orders, action) => {
      orders.orders.push(action.payload);
    },
    ordersloaded: (orders, action) => {
      orders.orders = action.payload;
    },
    orderloaded: (orders, action) => {
      const index = orders.findIndex((order) => order._id === action.id);
      orders[index] = action.payload;
    },
    orderRemoved: (orders, action) => {
      const index = orders.orders.findIndex((order) => order._id === action.id);
      orders.orders.splice(index, 1);
    },
  },
});

console.log(slice);

export const { orderAdded, orderloaded, orderRemoved } = slice.actions;
export default slice.reducer;

// Action Creators
export const loadOrders = () => (dispatch) => {
  http
    .get(apiEndpoint)
    .then((res) => {
      dispatch({
        type: slice.actions.ordersloaded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const addOrder = (order) => (dispatch, getState) => {
  http
    .post(apiEndpoint, order, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.orderAdded.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const removeOrder = (id) => (dispatch, getState) => {
  http
    .delete(`${apiEndpoint}/${id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: slice.actions.orderRemoved.type,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
