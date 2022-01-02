import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import image from "../../../images/Form/Mobile login-bro.svg";

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    user,
    createNewAccount,
    googleProvider,
    facebookProvider,
    signInWithSocialAccount,
  } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                             React Hook Form                             */
  /* -------------------------------------------------------------------------- */
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /* -------------------------------------------------------------------------- */
  /*                             SIGN UP/REGISTER WITH EMAIL                             */
  /* -------------------------------------------------------------------------- */
  const onSubmit = (data) => {
    // console.log(data);
    const userEmail = data.email;
    const userPassword = data.password;
    const userName = data.name;
    createNewAccount(userEmail, userPassword, userName);
  };

  return (
    <div className="form">
      <div className="sign-form">
        <Row>
          <Col className="sign-left" sm={12} md={6}>
            <div className="sign-greetings">
              <img src={image} alt="sign-in" />
            </div>
          </Col>
          <Col sm={12} md={6} className="sign-right">
            <div className="signIn">
              <h3 className="text-center ">Register Your Account</h3>

              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="form-label">Full Name</Form.Label>
                  <Form.Control
                    type="name"
                    placeholder="Your Name"
                    className="form-input"
                    {...register("name", { required: true })}
                  />
                  {errors.name?.type === "required" && (
                    <small className="required-text">Name is required</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="form-input"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  {errors.email?.type === "required" && (
                    <small className="required-text">Email is required</small>
                  )}
                  {errors.email?.type === "pattern" && (
                    <small className="required-text">Invalid Email</small>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    {...register("password", {
                      required: true,
                      pattern:
                        /^(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,
                    })}
                  />
                  {errors.password?.type === "required" && (
                    <small className="required-text">
                      Password is required
                    </small>
                  )}
                  {errors.password?.type === "pattern" && (
                    <small className="required-text">
                      Your password must contain 8 characters including at least
                      1 special character,1 uppercase & 1 digit..
                    </small>
                  )}
                </Form.Group>

                <div className="mb-3 d-flex justify-content-between align-items-center">
                  <Form.Check className="form-label" label="Remember me?" />
                  <button
                    // onClick={handleResetPassword}
                    type="reset"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      textDecoration: "underLine",
                      color: "#30D6BE",
                    }}
                    className="switch-link"
                  >
                    Forgot password?
                  </button>
                </div>

                <Form.Group className="mb-3" controlId="formHorizontalCheck">
                  <button className="w-100 btn-custom" type="submit">
                    Register
                  </button>
                </Form.Group>
              </Form>

              <small className="text-center text-more-option ">
                Or with Social Profile
              </small>
              <div className="social-btn-box my-3 d-flex justify-content-center align-items-center">
                <button className="btn-social">
                  <i class="fab fa-google"></i>
                </button>
                <button className="btn-social">
                  <i class="fab fa-facebook"></i>
                </button>
              </div>
              <small className="text-center d-block">
                Dont have an account?
                <Link to="/login" className="switch-link ms-1">
                  Sign In
                </Link>
              </small>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Login;
