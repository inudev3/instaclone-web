import { PropswithChildren } from "./shared";
import Header from "./Header";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

const Content = styled.div`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 930px;
  width: 100%;
`;

export default function Layout({ children }: PropswithChildren<any>) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}
