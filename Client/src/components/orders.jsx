import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "./../redux/users";
import { removeOrder } from "../redux/orders";
import NavBar from "./../common/navbar";
import { Button } from "react-bootstrap";

function Orders(props) {
  Orders.propTypes = {
    users: PropTypes.array.isRequired,
    username: PropTypes.string,
    updateUser: PropTypes.func.isRequired,
    removeOrder: PropTypes.func.isRequired,
  };
  const { users, username, orders } = props;

  const [orderedBooks, setOrderedBooks] = useState([]);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const getOrderedBooks = async (username) => {
    const user = users.filter((user) => user.username === username);
    setOrderedBooks(user[0]?.ordered_books);
    return user[0]?.ordered_books;
  };

  useEffect(() => {
    getOrderedBooks(username);
  }, [users, orderedBooks]);

  const handleCartButton = async (book) => {
    // Remove order
    const user = users.filter((user) => user.username === username);
    const orderId = orders.filter(
      (order) => order.book._id === book._id && order.user._id === user[0]?._id
    )[0]?._id;
    props.removeOrder(orderId);

    // Update User
    let currentProfile = { ...user[0] };
    let { ordered_books } = currentProfile;
    let arrayOrders = [...ordered_books];
    const found = arrayOrders.findIndex((order) => order.name === book.name);
    arrayOrders.splice(found, 1);
    currentProfile.ordered_books = arrayOrders;
    setOrderedBooks(arrayOrders);
    props.updateUser(currentProfile, user[0]._id);
  };

  if (orderedBooks?.length === 0)
    return (
      <React.Fragment>
        <NavBar />
        <p style={{ marginTop: "100px" }}> No Orders are made.</p>
      </React.Fragment>
    );

  return (
    <React.Fragment>
      <NavBar />
      <div className="ordered__books">
        {orderedBooks?.map((book) => (
          <div key={book.name} className="ordered__book">
            <div className="ordered__book__cover">
              <h3 className="ordered__book__title_android">{book.name}</h3>
              <img
                src={`${process.env.REACT_APP_ROOT_URL}/${book.image}`}
                alt={book.image}
              />
            </div>
            <div className="ordered__book__info">
              <h3 className="ordered__book__title">{book.name}</h3>
              <h5 className="ordered__book__author">Author : {book.author}</h5>
              <h6 className="ordered__book__genre">Genre : {book.genre}</h6>
              <p className="ordered__book__summary">
                <strong>Summary : </strong> {truncate(book.summary, 300)}
              </p>

              <p className="ordered__book__price">
                <strong>Price : </strong> {book.price}
              </p>
              <p className="ordered__book__rate">
                <strong>Rate : </strong> {book.rate}
              </p>
              <Button
                variant="warning"
                className="order__button"
                onClick={() => handleCartButton(book)}
              >
                Remove From Cart
              </Button>
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  users: state.users.users,
  username: state.auth.username,
  orders: state.orders.orders,
});

export default connect(mapStateToProps, { updateUser, removeOrder })(Orders);
