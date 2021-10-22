import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { register } from "../redux/auth";
import { createMessage } from "../redux/messages";
import Joi from "joi-browser";
import { validate, validateProperty } from "../services/validation";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { toast } from "react-toastify";

function Register(props) {
  Register.propTypes = {
    register: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().min(3).max(50).label("Username"),
    email: Joi.string().required().email().max(255).label("Email"),
    password: Joi.string().required().min(5).max(255).label("Password"),
    password2: Joi.string().required().min(5).max(255).label("Password2"),
    age: Joi.number().required().min(0).label("Age"),
    country: Joi.string().required().min(3).max(50).label("Country"),
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    // Errors
    const errors = validate(schema, {
      username,
      password,
      password2,
      email,
      country,
      age,
    });
    setErrors({ errors: errors || {} });
    if (errors) return;

    // Submission
    if (password !== password2) {
      // props.createMessage({ passwordNotMatch: "Passwords do not match" });
      toast.error("Passwords do not match");
    } else {
      const newUser = {
        username,
        password,
        email,
        country,
        age,
      };

      await props.register(newUser);
      await sleep(1000);
    }
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
    if (e.target.name === "email") {
      setEmail(e.currentTarget.value);
    }
    if (e.target.name === "country") {
      setCountry(e.currentTarget.value);
    }
    if (e.target.name === "age") {
      setAge(e.currentTarget.value);
    }
    if (e.target.name === "password") {
      setPassword(e.currentTarget.value);
    }
    if (e.target.name === "password2") {
      setPassword2(e.currentTarget.value);
    }
  };

  if (props.isAuthenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="col-md-6 m-auto">
      <Card className="card card-body mt-5">
        <h2 className="text-center">Register</h2>
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
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              className="form-control"
              name="email"
              onChange={onChange}
              value={email}
            />
            {errors["email"] && (
              <div className="alert alert-danger">{errors["email"]}</div>
            )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="country"
              onChange={onChange}
              value={country}
            />
            {errors["country"] && (
              <div className="alert alert-danger">{errors["country"]}</div>
            )}
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="text"
              className="form-control"
              name="age"
              onChange={onChange}
              value={age}
            />
            {errors["age"] && (
              <div className="alert alert-danger">{errors["age"]}</div>
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
          <Form.Group className="form-group">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              className="form-control"
              name="password2"
              onChange={onChange}
              value={password2}
            />
            {errors["password2"] && (
              <div className="alert alert-danger">{errors["password2"]}</div>
            )}
          </Form.Group>

          <div className="form-group">
            <Button
              type="submit"
              variant="primary"
              disabled={validate(schema, {
                username,
                password,
                password2,
                email,
                country,
                age,
              })}
            >
              Register
            </Button>
          </div>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </Form>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  register,
  createMessage,
})(Register);
