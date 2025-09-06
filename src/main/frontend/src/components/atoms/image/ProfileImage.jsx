import styled from "styled-components";
import media from "assets/styles/media";

import takuma from "components/images/Dog.jpg";

const ProfileImage = () => {
  return <SImg src={takuma} alt="プロフィール画像" />;
};

export default ProfileImage;

const SImg = styled.img`
  border-radius: 50%;
  width: 100%;
  height: auto;

  max-width: 160px;
  ${media.lg`
  max-width: 120px;
  `}
  ${media.md`
  max-width: 90px;
  `}
`;
