import React, { useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import { ToastContainer } from "react-toastify";

// Redux Store
import store from "./store";
import { loadUser } from "./redux/auth";
import { loadUsers, loadCurrentUser } from "./redux/users";
import { loadBooks } from "./redux/books";
import { loadComments } from "./redux/comments";
import { loadOrders } from "./redux/orders";

// Components
import BooksMainComponent from "./components/booksMainComponent";
import BookInfoPage from "./components/bookInfoPage";
import SearchPage from "./components/searchPage";
import Orders from "./components/orders";
import Login from "./common/login";
import Register from "./common/register";
import Home from "./components/home";
import NotFound from "./common/notFound";
import Alerts from "./common/alerts";
import AdminHome from "./components/adminHome";
import {
  AdminUpdateRoutes,
  AdminCreateRoutes,
} from "react-admin-table/dist/routes/adminRoutes";

// CSS
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./css/home.css";
import "./css/books.css";
import "./css/comments.css";
import "./css/orders.css";
import "./css/navbar.css";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "middle",
};

function App() {
  useEffect(() => {
    async function fetchData() {
      if (store.getState().auth.token) await store.dispatch(loadUser());
      //  if (store.getState().auth.token) await store.dispatch(loadCurrentUser());
      await store.dispatch(loadUsers());
      await store.dispatch(loadBooks());
      await store.dispatch(loadComments());
      await store.dispatch(loadOrders());
    }
    fetchData();
  }, []);

  return (
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <div className="App">
        <Alerts />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Switch>
          <Route path="/search/:query" component={SearchPage}></Route>
          <Route path="/books/:id" component={BookInfoPage}></Route>
          <Route path="/books" component={BooksMainComponent}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          {AdminUpdateRoutes} {AdminCreateRoutes}
          <Route path="/admin" component={AdminHome}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/not-found" component={NotFound} />
          <Redirect from="/" exact to="/home"></Redirect>
          <Redirect to="/not-found" />
        </Switch>
      </div>
    </AlertProvider>
  );
}

export default App;
