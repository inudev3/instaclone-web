import styled, { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38,38,38)",
  borderColor: "rgb(219, 219, 219)",
};
export const darkTheme: DefaultTheme = {
  fontColor: "lightgray",
  bgColor: "#2c2c2c",
  accent: "#0095f6",
};
export const Globalstyles = createGlobalStyle`
  ${reset}
  input {
    all: unset;
  }

  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.fontColor};
    font-size: 14px;
    font-family: 'Open Sans', sans-serif;
  }

  a {
    text-decoration: none;
  }



`;
