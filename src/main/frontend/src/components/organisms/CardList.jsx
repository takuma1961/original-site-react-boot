import React from "react";
import styled from "styled-components";
import media from "assets/styles/media";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CardTitle } from "components/molecules/card/CardTitle";
import { CardRating } from "components/molecules/card/CardRating";
import { CardTech } from "../molecules/card/CardTech";

export const CardList = (props) => {
  const { cardList, isSkillLevel, isUsedTech, isIcon, flexwrap, titleTechImg } =
    props;

  return (
    <SGrid
      container
      spacing={2}
      flexwrap={flexwrap}
      justifyContent={cardList.length === 1 ? "center" : "flex-start"}
    >
      {cardList.map((card) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={card.title}>
          <SCard>
            <img
              height={card.height}
              width={card.width}
              src={card.img}
              alt={card.name}
            />
            <CardTitle title={card.title} url={card.url} isIcon={isIcon} />
            <SUnderLine />
            <CardRating isSkillLevel={isSkillLevel} rate={card.rate} />
            <SCardText>{card.text}</SCardText>
            <CardTech
              titleTechImg={titleTechImg}
              isUsedTech={isUsedTech}
              usedTechImg={card.usedTechImg}
            />
          </SCard>
        </Grid>
      ))}
    </SGrid>
  );
};

const SGrid = styled(Grid)`
  margin: 0 auto;
  padding: 50px 0 50px;
  overflow: hidden;
  flex-wrap: ${({ flexwrap }) => flexwrap};
  justify-Content: ${({justifyContent}) => justifyContent}

  width: 80vw;
  ${media.lessThanlg`
    width: 98vw;
  `}
`;//SGrid = MUIのGridにCSSを追加して、自分用にカスタマイズしたもの

const SCard = styled(Card)`
  text-align: center;
  padding: 15px;
  border: solid 4px white;
  border-radius: 10px;
  background-color: #294286;
  color: #f0f0f0;
  height: 500px;
  box-sizing: border-box;
  /* カード要素の基準点用 */
  position: relative;
`;

const SUnderLine = styled.div`
  border-top: 3px solid #fff;
  padding-bottom: 10px;
  width: 100%;
  margin: 0 auto;
  max-width: 1500px;
`;

const SCardText = styled.p`
  text-align: left;
  margin-top: 10px;
  font-size: 16px;
  ${media.lg`
    font-size: 14px;
  `}
  ${media.md`
    font-size: 13px;
  `}
`;
