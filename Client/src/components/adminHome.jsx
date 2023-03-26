import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import AdminPage from "react-admin-table/dist/adminPage";

import ListTable from "react-admin-table/dist/ListTable";

import "react-admin-table/dist/css/admin.css";

import { addUser, updateUser, updateAllUser, deleteUser } from "../redux/users";
import { addBook, deleteBook } from "../redux/books";
import { addComment } from "../redux/comments";

function AdminHome(props) {
  AdminHome.prototype = {
    isAdmin: PropTypes.bool.isRequired,
    addBook: PropTypes.func.isRequired,
    deleteBook: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    addUser: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    updateAllUser: PropTypes.func.isRequired,
    deleteUser: PropTypes.func.isRequired,
  };

  const {
    isAdmin,
    addBook,
    deleteBook,
    addComment,
    addUser,
    updateUser,
    deleteUser,
    books,
    users,
    comments,
  } = props;

  useEffect(() => {
    
  }, [isAdmin])
  
  if (isAdmin === false) return <Redirect to="/home" />;

  return (
    <React.Fragment>
      <AdminPage />

      <ListTable
        data={{
          name: "books",
          imagesUrl: `${process.env.REACT_APP_ROOT_URL}/`,
          table: books,
          icon: <i className="fa fa-book"></i>,
        }}
        tableAttributes={[
          {
            title: "name",
            label: "Name",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "author",
            label: "Author",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "summary",
            label: "Summary",
            type: "text",
            format: "input",
            display: "form",
            validation_type: "string",
          },
          {
            title: "about_author",
            label: "About author",
            type: "text",
            format: "input",
            display: "form",
            validation_type: "string",
          },
          {
            title: "genre",
            label: "Genre",
            type: "text",
            format: "select",
            display: "table/form",
          },
          {
            title: "publisher",
            label: "Publisher",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "date",
            label: "Date",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "price",
            label: "Price",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
          {
            title: "rate",
            label: "Rate",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
          {
            title: "image",
            label: "Image",
            type: "file",
            format: "input",
            display: "table/form",
            image: true,
          },
        ]}
        search="name"
        filters={["genre"]}
        elementAdd={addBook}
        elementDelete={deleteBook}
      />

      <ListTable
        data={{
          name: "users",
          table: users,
          icon: <i className="fa fa-users"></i>,
        }}
        tableAttributes={[
          {
            title: "username",
            label: "Username",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "email",
            label: "Email",
            type: "email",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "password",
            label: "Password",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "isAdmin",
            label: "IsAdmin",
            type: "text",
            format: "select",
            display: "table/form",
          },

          {
            title: "age",
            label: "Age",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
          {
            title: "country",
            label: "Country",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
        ]}
        filters={["isAdmin"]}
        search="username"
        elementAdd={addUser}
        elementUpdate={updateUser}
        elementDelete={deleteUser}
      />

      <ListTable
        data={{
          name: "comments",
          table: comments,
          icon: <i className="fa fa-comments"></i>,
        }}
        tableAttributes={[
          {
            title: "comment",
            label: "Comment",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "string",
          },
          {
            title: "user.username",
            label: "Username",
            type: "text",
            format: "json",
            display: "table/form",
            validation_type: "object",
            urlForm: {
              tableName: "users",
              id: "user._id",
            },
          },

          {
            title: "book.name",
            label: "Book",
            type: "text",
            format: "json",
            display: "table/form",
            validation_type: "object",
            urlForm: {
              tableName: "books",
              id: "book._id",
            },
            relatedProperty: {
              tableName: "books",
              related_id: "book._id",
              property: "image",
              type: "image",
              imagesUrl: `${process.env.REACT_APP_ROOT_URL}/`,
            },
          },

          {
            title: "like_counter",
            label: "Like counter",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
          {
            title: "dislike_counter",
            label: "Dislike counter",
            type: "text",
            format: "input",
            display: "table/form",
            validation_type: "number",
          },
        ]}
        search="comment"
        elementAdd={addComment}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => ({
  isAdmin: state.auth.isAdmin,
  books: state.books.books,
  users: state.users.users,
  comments: state.comments.comments,
});

export default connect(mapStateToProps, {
  addBook,
  deleteBook,
  addComment,
  addUser,
  updateUser,
  updateAllUser,
  deleteUser,
})(AdminHome);
