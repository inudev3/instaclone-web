import {
  seeFeed_seeFeed,
  seeFeed_seeFeed_comments,
} from "../__generated__/seeFeed";
import { FatText } from "../components/shared";
import React from "react";
import styled from "styled-components";

const CommentsCaption = styled.span`
  margin-left: 15px;
`;

export default function Comment({ user, payload }: seeFeed_seeFeed_comments) {
  return (
    <>
      <FatText>{user.username}</FatText>
      <CommentsCaption>{payload}</CommentsCaption>
    </>
  );
}
