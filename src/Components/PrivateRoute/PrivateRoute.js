import React from "react";
// import { PuffLoader } from "react-spinners";
import { Redirect, Route } from "react-router";
import useAuth from "../../Hooks/useAuth";

const PrivateRoute = ({ children, ...rest }) => {
  const { user } = useAuth();

  //   /* -------------------------------------------------------------------------- */
  //   /*                 RENDERING THE SPINNER WHEN LOADING IS TRUE                 */
  //   /* -------------------------------------------------------------------------- */
  //   if (loading) {
  //     return (
  //       <div
  //         style={{
  //           minHeight: "90vh",
  //           display: "flex",
  //           alignItems: "center",
  //           justifyContent: "center",
  //         }}
  //       >
  //         <PuffLoader loading={loading} color="#64DECE" size={60} />
  //       </div>
  //     );
  //   }
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
