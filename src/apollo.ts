import {
  makeVar,
  ApolloClient,
  InMemoryCache,
  ReactiveVar,
  createHttpLink,
} from "@apollo/client";
import routes from "./routes";
import { setContext } from "@apollo/client/link/context";

export const DARK_MODE = "Dark Mode";
export const TOKEN = "token";
export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN))); //everytime isLoggedVar is init, so need to set default like this
export const logUserIn = (token: any) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};

export const logUserOut = (history: any) => {
  localStorage.removeItem(TOKEN);
  history.replace(routes.home, null); //history에 전달된 state 초기화
  isLoggedInVar(false);
};
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, "true");
  darkModeVar(true);
};
export const disableDarkMode = () => {
  localStorage.removeItem(DARK_MODE);
  darkModeVar(false);
};
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));

const httpLink = createHttpLink({ uri: "http://localhost:4000/graphql" });
const authLink = setContext((_, { headers }) => {
  //context의 headers에 token을 보내기
  const token = localStorage.getItem(TOKEN);
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

export const client = new ApolloClient({
  //to send a token, we need the set the token in headers
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
