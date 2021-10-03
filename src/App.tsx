import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./screens/Login";
import Home from "./screens/Home";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ThemeProvider } from "styled-components";
import { darkTheme, Globalstyles, lightTheme } from "./styles";
import NotFound from "./screens/NotFound";
import SingUp from "./screens/SingUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import Header from "./components/Header";
import Layout from "./components/Layout";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Globalstyles />
          <Router>
            <Switch>
              <Route path={routes.home} exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <Login />
                )}
              </Route>
              {!isLoggedIn ? (
                <Route path={routes.signUp}>
                  <SingUp />
                </Route>
              ) : null}
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
