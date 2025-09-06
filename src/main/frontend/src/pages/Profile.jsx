import styled from "styled-components";
import media from "assets/styles/media";
import GitHubIcon from "components/images/GithubIcon";
import InstagramIcon from "components/images/InstagramIcon";
import ProfileImage from "components/atoms/image/ProfileImage";
import { PageTitle } from "components/atoms/PageTitle";
import { ProfileTimeline } from "components/molecules/profile/ProfileTimeline";
import ProfileContents from "components/organisms/profile/ProfileContents";
import Header from "../components/PortfolioHeader.jsx";

const Profile = () => {
  return (
    <>
      <Header />
      <SComponentContainer>
        <PageTitle>PROFILE</PageTitle>
        <SProfileContainer>
          <ProfileImage />
          <SIconArea>
            <GitHubIcon url="https://github.com/takuma1961" />
            <InstagramIcon url="https://www.instagram.com/katsumatatakuma8/" />
          </SIconArea>
          <ProfileContents />
          <ProfileTimeline />
          <SSNS>
            フッターにGitHub、Twitter、Qiitaのアカウントを載せています。
          </SSNS>
        </SProfileContainer>
      </SComponentContainer>
    </>
  );
};

export default Profile;

const SComponentContainer = styled.div`
  text-align: center;
`;

const SProfileContainer = styled.div`
  width: 85vw;
  margin: 0 auto;

  padding-top: 100px;
  ${media.lg`
    padding-top: 50px;
  `}
  ${media.md`
    padding-top: 30px;
  `}
`;

const SIconArea = styled.div`
  display: flex;
  justify-content: center;
  gap: 30px;
  margin: 20px;
`;

const SSNS = styled.p`
  text-align: center;
  padding-bottom: 50px;

  font-size: 16px;
  ${media.lg`
    font-size: 14px;
  `}
  ${media.md`
    font-size: 12px;
  `}
`;
