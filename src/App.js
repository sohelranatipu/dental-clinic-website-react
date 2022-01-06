import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import Login from "./Pages/Forms/Login/Login";
import Register from "./Pages/Forms/Register/Register";
import About from "./Pages/About/About";
import Dentists from "./Pages/Dentists/Dentists";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import ServiceDetails from "./Components/ServiceDetails/ServiceDetails";
import Services from "./Pages/Services/Services";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";

const override = css``;

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="animation-box">
          <GridLoader
            loading={loading}
            size={30}
            color="#07a5e2"
            css={override}
          />
        </div>
      ) : (
        <div className="main">
          <Router>
            <Header></Header>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/home">
                <Home />
              </Route>
              <Route path="/about">
                <About />
              </Route>
              <PrivateRoute path="/dentists">
                <Dentists></Dentists>
              </PrivateRoute>
              <PrivateRoute path="/services">
                <Services></Services>
              </PrivateRoute>
              <PrivateRoute path="/service/:id">
                <ServiceDetails></ServiceDetails>
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
            </Switch>
            <Footer></Footer>
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
