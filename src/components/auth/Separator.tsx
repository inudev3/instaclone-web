import styled from "styled-components";
import React from "react";
import {PropswithChildren} from "../shared";

const SSeparator = styled.div`
  margin:20px 0px 30px 0px;
  text-transform:uppercase;
  display:flex;
  justify-content: center;
  width:100%;
  align-items: center;
  div{
    width:100%;
    height: 1px;
    background-color: ${props=>props.theme.borderColor};
  }
  span{
    margin:0px 10px;
    color: #8e8e8e;
  }
`;


 function Separator({children}:PropswithChildren<any>){
    return(
        <SSeparator>
            <div></div>
            <span>{children}</span>
            <div></div>
        </SSeparator>
    )
}
export default Separator;