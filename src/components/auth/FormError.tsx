import styled from "styled-components";

const SFormError= styled.span`
  color:tomato;
  font-weight:600;
  font-size:12px;
`;

type Prop = {
    message?:String
}

export default function FormError({message}:Prop){
    return message?(<SFormError>{message}</SFormError>): null;
}