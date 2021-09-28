import {BaseBox, PropswithChildren} from "../shared";
import styled from "styled-components";
import {Link} from "react-router-dom";
import React from "react";

const SBottomBox = styled(BaseBox)`
 
  padding:20px 0px;
  text-align:center;
  a {
    font-weight: 600;
    margin-left: 5px;
    color: ${props => props.theme.accent};
  }
`;


type IProps={
    cta:string,
    link:string,
    linkText:string,
}

export default function BottomBox({cta,link, linkText}:IProps){
    return(
        <SBottomBox>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </SBottomBox>
    )
}

