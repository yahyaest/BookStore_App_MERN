import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { login } from "../redux/auth";
import Joi from "joi-browser";
import { validate, validateProperty } from "../services/validation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Login(props) {
  Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  const onSubmit = (e) => {
    e.preventDefault();

    // Errors
    const errors = validate(schema, { username, password });
    setErrors({ errors: errors || {} });
    if (errors) return;

    props.login(username, password);
  };

  const onChange = (e) => {
    // Errors
    const errorsObject = { ...errors };
    const errorMessage = validateProperty(schema, e.currentTarget);

    if (errorMessage) {
      errorsObject[e.currentTarget.name] = errorMessage;
    } else {
      delete errorsObject[e.currentTarget.name];
    }
    setErrors(errorsObject);

    // Inputs
    if (e.target.name === "username") {
      setUsername(e.currentTarget.value);
    }
    if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    }
  };

  // console.log(props.isAuthenticated);
  if (props.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="col-md-10 m-auto">
      <Card className="card card-body mt-5">
        <h2 className="text-center">Login</h2>
        <Form onSubmit={onSubmit}>
          <Form.Group className="form-group">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="username"
              onChange={onChange}
              value={username}
            />
            {errors["username"] && (
              <div className="alert alert-danger">{errors["username"]}</div>
            )}
          </Form.Group>

          <Form.Group className="form-group">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              name="password"
              onChange={onChange}
              value={password}
            />
            {errors["password"] && (
              <div className="alert alert-danger">{errors["password"]}</div>
            )}
          </Form.Group>

          <div className="form-group">
            <Button
              disabled={validate(schema, { username, password })}
              type="submit"
              variant="primary"
            >
              Login
            </Button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
