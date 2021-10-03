import styled from "styled-components";

type AvatarProps = {
  url?: string | null;
  lg?: boolean;
};
const SAvatar = styled.div<AvatarProps>`
  width: ${(props) => (props.lg ? "30px" : "25px")};
  height: ${(props) => (props.lg ? "30px" : "25px")};
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
`;

export default function Avatar({ url, lg }: AvatarProps) {
  return <SAvatar lg={lg}>{url ? <Img src={url} /> : null}</SAvatar>;
}
