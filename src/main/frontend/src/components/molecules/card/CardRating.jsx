import React from "react";
import styled from "styled-components";
import Rating from "@mui/material/Rating";

export const CardRating = ({ isSkillLevel, rate }) => {
  return (
    <>
      {isSkillLevel ? (
        <SRatingContents>
          <h4 style={{ paddingTop: 0 }}>熟練度</h4>
          <Rating value={rate} readOnly />
        </SRatingContents>
      ) : null}
    </>
  );
};

const SRatingContents = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 13px;
`;
