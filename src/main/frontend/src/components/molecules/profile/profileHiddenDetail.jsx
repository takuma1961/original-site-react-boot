import React from "react";
import styled from "styled-components";
import media from "../../../assets/styles/media";

export const ProfileHiddenDetail = (props) => {
  const { type, detailText } = props;

  return (
    <>
      <SInput type="checkbox" id={"detail" + type} />
      <SHiddenDetail className="HiddenDetail">{detailText}</SHiddenDetail>
    </>
  );
};

const SInput = styled.input`
  display: none;

  &:checked ~ .HiddenDetail {
    height: auto;
    opacity: 1;

    padding: 15px;
    margin-top: 8px;

    ${media.lg`
      margin-top: 6px;
      padding: 12px;
    `}

    ${media.md`
      margin-top: 4px;
      padding: 9px;
    `}
  }
`;

const SHiddenDetail = styled.div`
  height: 0;
  overflow: hidden;
  opacity: 0;
  transition: 0.8s;
  text-align: left;
  width: 100%;
  border-radius: 5px;
  box-sizing: border-box;

  padding: 0 15px;
  font-size: 20px;
  border: solid 3px white;

  ${media.lg`
    padding: 0 12px;
    font-size: 16px;
    border: solid 2px white;
  `}

  ${media.md`
    padding: 0 9px;
    font-size: 12px;
    border: solid 1px white;
  `}
`;
