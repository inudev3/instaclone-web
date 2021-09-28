import React, {FC, ReactNode} from "react";
import styled from "styled-components";
import { PropswithChildren} from "../shared";

const Container = styled.div`
  display:flex;
  height: 100vh;
  justify-content:center;
  align-items: center;
  flex-direction: column;
`
const Wrapper = styled.div`
  max-width:350px;
  width:100%;
`;

function AuthLayout({children}:PropswithChildren<any>){
    return(
    <Container>
        <Wrapper>
            {children}
        </Wrapper>
    </Container>);
}
export default AuthLayout;
