import { Suspense, Fragment } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import { AuthRouteHelper, ProtectedRouteHelper } from "./helper";
import { ProtectedRoutes, AuthorizedRoutes } from "./routes";
// import Layout from "../container/layouts/index.js";

export function ApprRoutes({ isAuthenticated }) {
  return (
    <Router>
      <Fragment>
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Layout> */}
          <Routes>
            {AuthorizedRoutes.map(
              ({ component: Component, path, exact }, index) => (
                <Route
                  path={`${path}`}
                  key={index}
                  exact
                  element={
                    <ProtectedRouteHelper isAuthenticated={isAuthenticated}>
                      <Component />
                    </ProtectedRouteHelper>
                  }
                />
              )
            )}

            {ProtectedRoutes.map(
              ({ component: Component, path, exact }, index) => (
                <Route
                  path={`${path}`}
                  key={index}
                  exact
                  element={
                    <AuthRouteHelper isAuthenticated={isAuthenticated}>
                      <Component />
                    </AuthRouteHelper>
                  }
                />
              )
            )}
          </Routes>
          {/* </Layout> */}
        </Suspense>
      </Fragment>
    </Router>
  );
}
