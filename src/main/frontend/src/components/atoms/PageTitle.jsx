import React from "react";
import styled from "styled-components";
import media from "../../assets/styles/media";

export const PageTitle = (props) => {
  const { children } = props;
  return <SPageTitle>{children}</SPageTitle>;
};

const SPageTitle = styled.h1`
  text-align: center;

  display: none;

  ${media.lg`
    display: block;
    font-size: 32px;
    margin-top: 50px;
  `}

  ${media.md`
    display: block;
    font-size: 24px;
    margin-top: 30px;
  `}
`;
