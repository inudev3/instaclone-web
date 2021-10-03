import Avatar from "../components/Avatar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as SolidHeart} from "@fortawesome/free-solid-svg-icons";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import React from "react";
import styled from "styled-components";
import {FatText} from "../components/shared";
import {seeFeed, seeFeed_seeFeed} from "../__generated__/seeFeed";
import {DocumentNode, gql, useMutation} from "@apollo/client";
import {FEED_QUERY} from "../screens/Home";
import {toggleLike, toggleLike_toggleLike} from "../__generated__/toggleLike";

const PhotoContainer = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;
  max-width: 615px;
`;
const PhotoHeader = styled.header`
  display: flex;
  align-items: center;
  padding: 15px;
`;
const Username = styled(FatText)`
  margin-left: 15px;
`;
const PhotoFile = styled.img`
  min-width: 100%;
  border-color: ${(props) => props.theme.borderColor};
`;
const PhotoData = styled.div`
  padding: 15px;
`;
const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;

    span {
      cursor: pointer;
    }

    svg {
      margin-left: 10px;
      font-size: 20px;
    }
  }
`;

const Likes = styled(FatText)`
  margin-top: 10px;
  display: block;
`;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;
type PhotoProps = {
  photo: seeFeed_seeFeed | null;
};

export default function Photo({photo}: PhotoProps) {
  const [toggleLikeMutation, {data, loading, error}] =
  useMutation<toggleLike>(TOGGLE_LIKE_MUTATION, {
    variables: {id: photo?.id},
    //refetchQueries: [{ query: FEED_QUERY }], refetching the whole query is not a good idea
    update: (cache, result) => {
      //link to the Apollo cache and data from the backend
      const {data: {toggleLike: {ok}}} = result;


      if (result?.data?.toggleLike?.ok) {
        const fragmentId = `Photo:${photo?.id}`;
        const fragment = gql`
          fragment BSname on Photo {
            #fragment name on type
            isLiked
            likes
          }`;
        const result = cache.readFragment({
          id: fragmentId,
          fragment,
        })

        if ("isLiked" in result && "likes" in result) {
          const {isLikd, likes} = result;
          cache.writeFragment({
            id: fragmentId,
            fragment,
            data: {
              isLiked: result?.isLiked, //fetch하는게  아니기 때문에 직접 데이터를 변경해서 전달해줘야 한다.
              likes: result?.isLiked ? result?.likes - 1 : result?.likes! + 1,
            },
          });
        }
      }
    },
  });
  return (
      <PhotoContainer key={photo?.id}>
        <PhotoHeader>
          <Avatar url={photo?.user.avatar} lg={true}/>
          <Username>{photo?.user.username}</Username>
        </PhotoHeader>
        <PhotoFile src={photo?.file}/>
        <PhotoData>
          <PhotoActions>
            <div>
            <span onClick={() => toggleLikeMutation()}>
              <FontAwesomeIcon
                  style={{color: photo?.isLiked ? "tomato" : "inherit"}}
                  icon={photo?.isLiked ? SolidHeart : faHeart}
                  size={"2x"}
              />
            </span>
              <FontAwesomeIcon icon={faComment} size={"2x"}/>
              <FontAwesomeIcon icon={faPaperPlane} size={"2x"}/>
            </div>
            <div>
              <FontAwesomeIcon icon={faBookmark} size={"2x"}/>
            </div>
          </PhotoActions>
          <Likes>{photo?.likes === 1 ? `1 like` : `${photo?.likes} likes`}</Likes>
        </PhotoData>
      </PhotoContainer>
  );
}
