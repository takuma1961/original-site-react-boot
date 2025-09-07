import React from "react";
import styled from "styled-components";
import media from "assets/styles/media";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { CardTitle } from "components/molecules/card/CardTitle";
import { CardRating } from "components/molecules/card/CardRating";
import { CardTech } from "components/molecules/card/CardTech";

export const CardList2 = (props) => {
  const { cardList, isSkillLevel, isUsedTech, isIcon, flexwrap, titleTechImg } =
    props;

  return (
    <SGrid
      container //子要素を並べる親グリッド
      spacing={2} //子要素同士の余白調整
      flexwrap={flexwrap} //Flexbox で子要素を横に並べたときに「折り返すかどうか」を決めるもの
      justifyContent={cardList.length === 1 ? "center" : "flex-start"}
    >
      {cardList.map((card) => (
        <SGridItem size={{ xs: 12, sm: 6, md: 4 }} key={card.title}>
          <SCard>
            <SCardContent>
              <SImageContainer>
                <img
                  src={card.img}
                  alt={card.name}
                  style={{
                    width: "100%",
                    maxWidth: "150px",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </SImageContainer>
              <CardTitle title={card.title} url={card.url} isIcon={isIcon} />
              <SUnderLine />
              <CardRating isSkillLevel={isSkillLevel} rate={card.rate} />
              <SCardText>{card.text}</SCardText>
            </SCardContent>
            <SCardFooter>
              <CardTech
                titleTechImg={titleTechImg}
                isUsedTech={isUsedTech}
                usedTechImg={card.usedTechImg}
              />
            </SCardFooter>
          </SCard>
        </SGridItem>
      ))}
    </SGrid>
  );
};

const SGrid = styled(Grid)`
  margin: 0 auto;
  padding: 50px 0 50px;
  overflow: hidden;
  flex-wrap: ${({ flexwrap }) =>
    flexwrap ||
    "wrap"}; //子要素を横並びしたときに、折り返すか都度引数で設定。引数がない場合はデフォルトで折り返し
  justify-content: ${({ justifyContent }) => justifyContent};

  width: 80vw;
  ${media.lessThanlg`
    width: 98vw;
  `}
`;

const SGridItem = styled(Grid)`
  display: flex;
  flex-direction: column;
`;

const SCard = styled(Card)`
  text-align: center;
  padding: 15px;
  border: solid 4px white;
  border-radius: 10px;
  background-color: #294286;
  color: #f0f0f0;
  width: 100%;
  height: 100%;
  min-height: 450px;
  box-sizing: border-box;
  display: flex !important;
  flex-direction: column !important;
  position: relative;
`;

const SCardContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const SImageContainer = styled.div`
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const SCardFooter = styled.div`
  margin-top: auto;
`;

const SUnderLine = styled.div`
  border-top: 3px solid #fff;
  padding-bottom: 10px;
  width: 100%;
  margin: 10px auto;
  max-width: 1500px;
`;

const SCardText = styled.p`
  text-align: left;
  margin: 10px 0;
  font-size: 16px;
  flex: 1;
  ${media.lg`
    font-size: 14px;
  `}
  ${media.md`
    font-size: 13px;
  `}
`;
