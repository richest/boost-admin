import { Suspense, Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthRouteHelper, ProtectedRouteHelper } from "./helper";
import { AuthorizedRoutes, ProtectedRoutes } from "./routes";
import ScreenLoader from "../components/delay-appearence/ScreenLoader";

function AppRoutes({ isAuthenticated }) {
  return (
    <Fragment>
      <Suspense fallback={<ScreenLoader />}>
        <Routes>
          {AuthorizedRoutes.map(
            ({ component: Component, children, slug, exact }, index) =>
              children ? (
                <Route
                  path={`${slug}`}
                  key={index}
                  element={
                    <AuthRouteHelper isAuthenticated={isAuthenticated}>
                      <Component />
                    </AuthRouteHelper>
                  }
                >
                  {children
                    ? children.map(
                        (
                          {
                            component: Components,
                            path,
                            exact,
                            parameter = null,
                          },
                          indexes
                        ) => (
                          <Route
                            path={
                              parameter !== null ? `${path}${parameter}` : path
                            }
                            key={indexes}
                            exact={exact}
                            element={
                              <AuthRouteHelper
                                isAuthenticated={isAuthenticated}
                              >
                                <Components />
                              </AuthRouteHelper>
                            }
                          />
                        )
                      )
                    : ""}
                </Route>
              ) : (
                ""
              )
          )}

          {ProtectedRoutes.map(
            (
              { component: Component, slug, exact, parameter = null },
              index
            ) => (
              <Route
                path={parameter !== null ? `${slug}${parameter}` : slug}
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
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default AppRoutes;
