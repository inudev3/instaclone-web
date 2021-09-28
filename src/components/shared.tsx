import styled from "styled-components";
import {ReactNode} from "react";

export type PropswithChildren<P> = P &{children?:ReactNode};

export const BaseBox = styled.div`
  background-color:white;
  border:1px solid ${props=>props.theme.borderColor};
  width:100%;
`;

export const FatLink = styled.span`
  font-weight: 600;
  color:rgb(142,142,142);
`;