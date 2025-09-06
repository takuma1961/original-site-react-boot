import React from "react";
import styled from "styled-components";
import media from "assets/styles/media";

import { DesktopIcon } from "components/images/DesktopIcon";

export const CardTitle = ({ title, url, isIcon }) => {
  return (
    <SComponentContainer>
      <SEmpty />
      <STitle>{title}</STitle>
      {isIcon ? <SDeskTopIcon url={url} /> : <SEmpty />}
    </SComponentContainer>
  );
};

const SComponentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SEmpty = styled.div`
  width: 30px;
`;

const STitle = styled.h2`
  margin: 5px 10px 5px 5px;

  font-size: 20px;
  ${media.lg`
    font-size: 18px;
  `}
  ${media.md`
    font-size: 16px;
  `}
`;

const SDeskTopIcon = styled(DesktopIcon)`
  width: 30px;
`;
