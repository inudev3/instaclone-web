import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  ReactiveVar,
} from "@apollo/client";
import routes from "./routes";

const TOKEN = "token";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logUserIn = (token: any) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: any) => {
  localStorage.removeItem(TOKEN);
  history.replace(routes.home, null); //history에 전달된 state 초기화
  isLoggedInVar(false);
};

export const darkModeVar = makeVar(false);

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});
