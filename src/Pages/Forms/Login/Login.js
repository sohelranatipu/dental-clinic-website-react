import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import image from "../../../images/Form/Secure login-bro.svg";
import "./Login.css";
import { useForm } from "react-hook-form";
import { Link, useHistory, useLocation } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import popupSuccess from "../../../PopUp/popupSuccess";
import popupError from "../../../PopUp/popupError";

const Login = () => {
  const {
    user,
    googleProvider,
    facebookProvider,
    signInWithEmail,
    signInWithSocialAccount,
    resetPassword,
  } = useAuth();

  /* -------------------------------------------------------------------------- */
  /*                            Login Page Redirect URL                             */
  /* -------------------------------------------------------------------------- */
  const history = useHistory();
  const location = useLocation();
  const redirectUrl = location.state?.from || "/home";

  /* -------------------------------------------------------------------------- */
  /*                             React Hook Form                             */
  /* -------------------------------------------------------------------------- */
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  /* -------------------------------------------------------------------------- */
  /*                             SIGN IN WITH EMAIL                             */
  /* -------------------------------------------------------------------------- */
  const onSubmit = (data) => {
    // setUser(data);
    const userEmail = data.email;
    const userPassword = data.password;
    signInWithEmail(userEmail, userPassword)
      .then((result) => {
        popupSuccess("login");
        history.push(redirectUrl);
      })
      .catch((err) => {
        popupError(err.message);
      });
  };

  /* -------------------------------------------------------------------------- */
  /*                         SIGN IN WITH SOCIAL ACCOUNT                        */
  /* -------------------------------------------------------------------------- */
  const handleSignInWithSocial = (provider) => {
    signInWithSocialAccount(provider)
      .then((result) => {
        popupSuccess("login");
        history.push(redirectUrl);
      })
      .catch((err) => {
        popupError(err.message);
      });
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
              <h1 className="text-center ">Sign In</h1>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label className="form-label">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    className="form-input"
                    {...register("email", { required: true })}
                  />
                  {errors.email?.type === "required" && (
                    <small className="required-text">Email is required</small>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    className="form-input"
                    {...register("password", { required: true })}
                  />
                  {errors.password?.type === "required" && (
                    <small className="required-text">
                      Password is required
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
                    Sign In
                  </button>
                </Form.Group>
              </Form>
              <small className="text-center text-more-option ">
                Or with Social Profile
              </small>
              <div className="social-btn-box my-3 d-flex justify-content-center align-items-center">
                <button
                  className="btn-social"
                  onClick={() => handleSignInWithSocial(googleProvider)}
                >
                  <i class="fab fa-google"></i>
                </button>
                <button
                  className="btn-social"
                  onClick={() => handleSignInWithSocial(facebookProvider)}
                >
                  <i class="fab fa-facebook"></i>
                </button>
              </div>
              <small className="text-center d-block">
                Dont have an account?
                <Link to="/register" className="switch-link ms-1">
                  Sign Up
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
