import React from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { seeFeed } from "../__generated__/seeFeed";
import styled from "styled-components";
import Photo from "../feed/Photo";
import PageTitle from "../components/PageTitle";

export const FEED_QUERY = gql`
  query seeFeed($lastId: Int) {
    seeFeed(lastId: $lastId) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      commentNumber
      createdAt
      isMine
      isLiked
    }
  }
`;

export default function Home({}) {
  const { data } = useQuery<seeFeed>(FEED_QUERY);
  return (
    <div>
      <PageTitle title="Home" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo?.id} photo={photo} />
      ))}
    </div>
  );
}
