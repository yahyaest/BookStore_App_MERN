import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, useHistory } from "react-router-dom";
import { logout } from "./../redux/auth";

import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";

function NavBar(props) {
  NavBar.prototype = {
    isAdmin: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    username: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    logout: PropTypes.func.isRequired,
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [display, setDisplay] = useState(true);
  const [phoneDisplay, setPhoneDisplay] = useState(true);

  const wrapperRef = useRef(null);

  const { isAdmin, isAuthenticated, username, books } = props;
  let searchList = books.filter((book) =>
    book.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  searchList = searchList.slice(0, 5);

  let history = useHistory();

  console.log(isAdmin);

  useEffect(() => {
    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    const { current: wrap } = wrapperRef;
    if (wrap && !wrap.contains(event.target)) {
      setPhoneDisplay(true);
    }
  };

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  const handleLogin = () => {
    isAuthenticated ? props.logout() : history.push("/login");
  };

  const handleSearch = (e) => {
    setSearchQuery(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    if (!searchQuery) alert("The search input is empty.");
    else {
      e.preventDefault();
      history.push(`/search/${searchQuery}`);
    }
  };

  return (
    <React.Fragment>
      <div className="bookstore_navbar">
        <div className="navbar_brand" style={{ width: "10%" }}>
          <Link to="/" style={{ textDecoration: "none", color: "gold" }}>
            <p>
              Book <strong>Store</strong>
            </p>
          </Link>
        </div>

        {isAuthenticated && (
          <div className="navbar_item" style={{ width: "10%" }}>
            <p style={{ color: "gold" }}>
              Hello <strong style={{ color: "gold" }}>{username}</strong>
            </p>
          </div>
        )}

        <Form className="search_form" style={{ width: "40%", margin: "0 50px" }} onSubmit={onSubmit} >
          <Form.Group>
            <InputGroup
              className="mb-3"
              ref={wrapperRef}
              onClick={() => {
                if (display === false) setDisplay(!display);
              }}
            >
              <FormControl
                placeholder="Search book..."
                aria-label="Search book..."
                aria-describedby="basic-addon2"
                onChange={handleSearch}
              />
              <InputGroup.Append>
                <i
                  className="fa fa-search search_icon"
                  onClick={onSubmit}
                ></i>
              </InputGroup.Append>
              {display && searchQuery && (
                <div className="search__list">
                  {searchList?.map((book) => (
                    <div
                      onClick={() =>
                        (window.location.href = `/books/${book._id}`)
                      }
                      className="search__list__element"
                      key={book._id}
                    >
                      <img
                        src={`${process.env.REACT_APP_ROOT_URL}/${book.image}`}
                        alt={book.image}
                      />
                      <div>
                        <p>
                          <strong>{truncate(book.name, 50)}</strong>
                        </p>
                        <p>by {book.author}</p>
                      </div>

                      <hr />
                    </div>
                  ))}
                  <div
                    onClick={() =>
                      (window.location.href = `/search/${searchQuery}`)
                    }
                    className="search__all__element"
                  >
                    <p>See all result for "{searchQuery}"</p>
                  </div>
                </div>
              )}
            </InputGroup>
          </Form.Group>
        </Form>

        <div
          className="navbar_menu"
          style={{
            width: "40%",
          }}
        >
          <div
            className="navbar-end"
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "-10px",
            }}
          >
            <div
              onClick={handleLogin}
              className="navbar-item"
              style={{ color: "gold", cursor: "pointer" }}
            >
              {isAuthenticated ? "Logout" : "Login"}
            </div>
            <Link to="/books" className="navbar-item" style={{ color: "gold" }}>
              Books
            </Link>
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin"
                className="navbar-item"
                style={{ color: "gold" }}
              >
                Admin
              </Link>
            )}
            {isAuthenticated && (
              <Link
                to="/orders"
                className="navbar-item"
                style={{ color: "gold" }}
              >
                Orders
              </Link>
            )}

            <span className="navbar-item" >
              <a
                className="button is-info is-inverted github_btn"
                href="https://github.com/yahyaest/BookStore_App"
              >
                <span className="icon">
                  <i className="fa fa-github"></i>
                </span>
                <span>Download</span>
              </a>
            </span>
          </div>
        </div>
      </div>

      <div className="bookstore_navbar_android">
        <div className="first_nav">
          <div
            className="navbar_brand"
            style={{ width: "25%", fontSize: "10px" }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "gold" }}>
              <p>
                Book <strong>Store</strong>
              </p>
            </Link>
          </div>

          {isAuthenticated && (
            <div
              className="navbar_item"
              style={{ width: "15%", fontSize: "10px" }}
            >
              <p style={{ color: "gold" }}>
                Hello <strong style={{ color: "gold" }}>{username}</strong>
              </p>
            </div>
          )}

          <div
            className="navbar_menu"
            style={{
              width: "60%",
            }}
          >
            <div
              className="navbar-end"
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: "-10px",
                fontSize: "10px",
              }}
            >
              <div
                onClick={handleLogin}
                className="navbar-item"
                style={{ color: "gold", cursor: "pointer" }}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </div>
              <Link
                to="/books"
                className="navbar-item"
                style={{ color: "gold" }}
              >
                Books
              </Link>

              {isAuthenticated && isAdmin && (
                <Link
                  to="/admin"
                  className="navbar-item"
                  style={{ color: "gold" }}
                >
                  Admin
                </Link>
              )}
              
              {isAuthenticated && (
                <Link
                  to="/orders"
                  className="navbar-item"
                  style={{ color: "gold" }}
                >
                  Orders
                </Link>
              )}
            </div>
          </div>
        </div>

        <div className="second_nav">
          <Form style={{ width: "90%" }} onSubmit={onSubmit}>
            <Form.Group>
              <InputGroup
                className="mb-3"
                ref={wrapperRef}
                onClick={() => {
                  if (phoneDisplay === false) setPhoneDisplay(!phoneDisplay);
                }}
              >
                <FormControl
                  placeholder="Search book..."
                  aria-label="Search book..."
                  aria-describedby="basic-addon2"
                  onChange={handleSearch}
                />
                <InputGroup.Append>
                  <i
                    className="fa fa-search search_icon"
                   
                    onClick={onSubmit}
                  ></i>
                </InputGroup.Append>
                {phoneDisplay && searchQuery && (
                  <div className="search__list">
                    {searchList?.map((book) => (
                      <div
                        onClick={() =>
                          (window.location.href = `/books/${book._id}`)
                        }
                        className="search__list__element"
                        key={book._id}
                      >
                        <img
                          src={`${process.env.REACT_APP_ROOT_URL}/${book.image}`}
                          alt={book.image}
                        />
                        <div>
                          <p>
                            <strong>{truncate(book.name, 50)}</strong>
                          </p>
                          <p>by {book.author}</p>
                        </div>

                        <hr />
                      </div>
                    ))}
                    <div
                      onClick={() =>
                        (window.location.href = `/search/${searchQuery}`)
                      }
                      className="search__all__element"
                    >
                      <p>See all result for "{searchQuery}"</p>
                    </div>
                  </div>
                )}
              </InputGroup>
            </Form.Group>
          </Form>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  isAuthenticated: state.auth.isAuthenticated,
  username: state.auth.username,
  books: state.books.books,
});

export default connect(mapStateToProps, { logout })(NavBar);
